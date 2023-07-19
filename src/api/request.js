import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyClDJqVzdNySJ4Ww88_n0_-oX1UXMcz1Ag',
	authDomain: 'start-up-a5547.firebaseapp.com',
	projectId: 'start-up-a5547',
	storageBucket: 'start-up-a5547.appspot.com',
	messagingSenderId: '507364745725',
	appId: '1:507364745725:web:07c4630178fe6ce3357994',
	measurementId: 'G-RQV6PVZCEV'
}

firebase.initializeApp(firebaseConfig)

class Request {
	constructor() {
		this.auth = firebase.auth()
		this.firestore = firebase.firestore()
		this.storage = firebase.storage()
	}

	async signUpWithEmail(email, password, userData) {
		try {
			const credential = firebase.auth.EmailAuthProvider.credential(email, password)
			const userCredential = await this.auth.signInWithCredential(credential)
			const user = userCredential.user
			const userDocRef = this.firestore.collection('users').doc(user.uid)
			await this.setDocument('users', user.uid, { id: user.uid, email: user.email, ...userData })
			const userDocSnapshot = await userDocRef.get()
			if (userDocSnapshot.exists) {
				return { id: user.uid, ...userDocSnapshot.data() }
			} else {
				return false
			}
		} catch (error) {
			throw error
		}
	}

	async signInWithEmail(email, password) {
		try {
			const userCredential = await this.auth.signInWithEmailAndPassword(email, password)
			const user = userCredential.user
			const userDocRef = this.firestore.collection('users').doc(user.uid)
			const userDocSnapshot = await userDocRef.get()
			if (userDocSnapshot.exists) {
				return { id: user.uid, ...userDocSnapshot.data() }
			} else {
				return false
			}
		} catch (error) {
			throw error
		}
	}

	async resetPasswordWithEmail(email, newPassword) {
		try {
			const credential = firebase.auth.EmailAuthProvider.credential(email, newPassword)
			const userCredential = await this.auth.signInWithCredential(credential)
			const user = userCredential.user
			await user.updatePassword(newPassword)
		} catch (error) {
			throw error
		}
	}

	async signOut() {
		try {
			await this.auth.signOut()
		} catch (error) {
			throw error
		}
	}

	async addDocument(collection, data) {
		try {
			const docRef = await this.firestore.collection(collection).add(data)
			return { id: docRef.id, ref: docRef }
		} catch (error) {
			throw error
		}
	}

	async getDocuments(collection) {
		try {
			const snapshot = await this.firestore.collection(collection).get()
			return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
		} catch (error) {
			throw error
		}
	}

	async getDocument(collection, documentId) {
		try {
			const docRef = this.firestore.collection(collection).doc(documentId)
			const doc = await docRef.get()
			if (doc.exists) {
				return { id: doc.id, ...doc.data() }
			} else {
				return false
			}
		} catch (error) {
			throw error
		}
	}

	async updateDocument(collection, docId, data) {
		try {
			await this.firestore.collection(collection).doc(docId).update(data)
		} catch (error) {
			throw error
		}
	}

	async setDocument(collection, docId, data) {
		try {
			await this.firestore.collection(collection).doc(docId).set(data)
		} catch (error) {
			throw error
		}
	}

	async deleteDocument(collection, docId) {
		try {
			await this.firestore.collection(collection).doc(docId).delete()
		} catch (error) {
			throw error
		}
	}

	async uploadFile(storagePath, file) {
		try {
			const storageRef = this.storage.ref(storagePath)
			const snapshot = await storageRef.put(file)
			const downloadURL = await snapshot.ref.getDownloadURL()
			return downloadURL
		} catch (error) {
			throw error
		}
	}

	async deleteFile(storagePath) {
		try {
			const storageRef = this.storage.ref(storagePath)
			await storageRef.delete()
		} catch (error) {
			throw error
		}
	}
}

export default Request

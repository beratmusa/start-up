import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Route } from 'react-router-dom'
import Locales from './lang'
import Home from './pages/Home'
import Login from './pages/login'

import '@ionic/react/css/core.css'

import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

import '@ionic/react/css/display.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'

import { IntlProvider } from 'react-intl'
import './theme/style.scss'
import './theme/variables.css'

setupIonicReact()

const App = () => {
	const locale = Locales['tr']

	return (
		<IonApp>
			<IntlProvider locale={locale.code} messages={locale.messages} onError={error => error.code === 'MISSING_TRANSLATION'} defaultLocale="tr">
				<IonReactRouter>
					<IonRouterOutlet>
						<Route exact path="/">
							<Login />
						</Route>
						<Route exact path="/home">
							<Home />
						</Route>
					</IonRouterOutlet>
				</IonReactRouter>
			</IntlProvider>
		</IonApp>
	)
}

export default App

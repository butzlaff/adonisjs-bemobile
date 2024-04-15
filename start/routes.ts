/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AddressesController = () => import('#controllers/addresses_controller')
const ClientsController = () => import('#controllers/clients_controller')
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')
const TelephonesController = () => import('#controllers/telephones_controller')
const UsersController = () => import('#controllers/users_controller')

router.get('/', async () => {
  return { status: 'The api are running' }
})
router.post('login', [UsersController, 'login'])
router.post('users', [UsersController, 'store'])

router
  .group(() => {
    router.resource('users', UsersController).except(['create', 'edit', 'store'])

    router.resource('clients', ClientsController).except(['create', 'edit'])

    router.resource('products', ProductsController).except(['create', 'edit'])

    router.resource('sales', SalesController).except(['create', 'edit', 'update'])

    router.put('clients/:id/addresses', [AddressesController, 'update'])
    router.put('clients/:id/telephone', [TelephonesController, 'update'])
  })
  .use(middleware.auth())

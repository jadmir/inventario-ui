const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'Login', component: () => import('pages/Login.vue') },
      {
        path: '/inicio',
        name: 'Inicio',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/categorias',
        name: 'Categoria',
        component: () => import('pages/Categoria.vue')
      },
      {
        path: '/bienes',
        name: 'Bien',
        component: () => import('pages/Bienes.vue')
      },
      {
        path: '/areas',
        name: 'Area',
        component: () => import('pages/Areas.vue')
      },
      {
        path: '/ubicaciones',
        name: 'Ubicacion',
        component: () => import('pages/Ubicaciones.vue')
      },
      {
        path: '/empleados',
        name: 'Empleado',
        component: () => import('pages/Empleado.vue')
      },
      {
        path: '/usuarios',
        name: 'Usuario',
        component: () => import('pages/Usuario.vue')
      },
      {
        path: '/inventarios',
        name: 'Inventario',
        component: () => import('pages/Inventario.vue')
      },
      {
        path: '/ingresos',
        name: 'Ingreso',
        component: () => import('pages/Ingreso.vue')
      },
      {
        path: '/salidas',
        name: 'Salida',
        component: () => import('pages/Salida.vue')
      },
      {
        path: '/bajas',
        name: 'Baja',
        component: () => import('pages/Baja.vue')
      },
      {
        path: '/kardex',
        name: 'Kardex',
        component: () => import('pages/Kardex.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="isLogged" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-space />

        <q-item clickable v-ripple>
          <q-item-section>
            <q-avatar size="35px" color="dark">
              {{ identity.nombre_user.substring(0, 1).toUpperCase() }}
            </q-avatar>
          </q-item-section>

          <logout-button :userName="identity.nombre_user" />
        </q-item>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isLogged"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="Drawer"
    >
      <router-link to="/">
        <div class="Logo">
          <img
            src="https://docplayer.es/docs-images/107/176744668/images/1-0.jpg"
            alt="LOGO"
          />
        </div>
      </router-link>
      <q-list>
        <q-item-label header class="text-weight-bold text-uppercase">
          Bienes
        </q-item-label>
        <EssentialLink
          v-for="link in bienLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-mt-md q-mb-xs" />

        <q-item-label header class="text-weight-bold text-uppercase">
          Personal
        </q-item-label>
        <EssentialLink
          v-for="link in personalLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-mt-md q-mb-xs" />

        <q-item-label header class="text-weight-bold text-uppercase">
          Operaciones
        </q-item-label>
        <EssentialLink
          v-for="link in operacionesLinks"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-mt-md q-mb-xs" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import MixinInit from '../mixin/MixinInit'
import LogoutButton from 'src/components/Layout/LogoutButton.vue'

const bienLinks = [
  {
    title: 'Areas',
    icon: 'store',
    link: 'areas'
  },
  {
    title: 'Ubicaciones',
    icon: 'local_offer',
    link: 'ubicaciones'
  },
  {
    title: 'Categorias',
    icon: 'category',
    link: 'categorias'
  },
  {
    title: 'Bienes',
    icon: 'qr_code_2',
    link: 'bienes'
  },
  {
    title: 'Kardex',
    icon: 'dashboard',
    link: 'kardex'
  }
]

const personalLinks = [
  {
    title: 'Empleados',
    icon: 'groups',
    link: 'empleados'
  },
  {
    title: 'Usuarios',
    icon: 'account_circle',
    link: 'usuarios'
  }
]

const operacionesLinks = [
  {
    title: 'Inventario',
    icon: 'description',
    link: 'inventarios'
  },
  {
    title: 'Ingresos',
    icon: 'flight_land',
    link: 'ingresos'
  },
  {
    title: 'Salidas',
    icon: 'flight_takeoff',
    link: 'salidas'
  },
  {
    title: 'Bajas',
    icon: 'get_app',
    link: 'bajas'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink, LogoutButton },
  mixins: [MixinInit],
  data() {
    return {
      leftDrawerOpen: false,
      bienLinks,
      personalLinks,
      operacionesLinks
    }
  },

  methods: {
    // logout() {
    //   this.$q.sessionStorage.clear()
    //   // this.$router.replace({
    //   //   name: "Login"
    //   // });
    //   window.location.reload(true)
    // }
  }
}
</script>

<style lang="scss" scoped>
.Drawer {
  .Logo {
    margin: 1em 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
    }
  }
}
</style>

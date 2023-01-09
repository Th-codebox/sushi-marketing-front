export const state = ({
  showMainAside: true,
  showSnackbar: false,
  snackbarText: '',
  snackbarColor: 'red',
  snackbarTimeout: '5000',
  ordersAmount: 0,
  items: [
    {
      title: 'Консоль',
      icon: 'mdi-view-dashboard',
      to: '/',
    },
    {
      title: 'Филиалы',
      icon: 'mdi-assistant',
      to: '/branches',
    },
    {
      title: 'Заказы',
      icon: 'fa-shopping-basket',
      to: '/',
    },
    {
      title: 'Пользователи',
      icon: 'mdi-face',
      items: [
        {
          title: 'Клиенты',
          to: '/clients',
        },
        {
          title: 'Сотрудники',
          to: '/staff',
        },
        {
          title: 'Роли',
          to: '/roles',
        },
      ],
    },
    {
      title: 'Справочники',
      icon: 'mdi-image',
      items: [
        { title: 'Категории', to: '/categories' },
        { title: 'Меню', to: '/menu' },
        { title: 'Модификаторы', to: '/modifications' },
        { title: 'Технические карты', to: '/technicalcards' },
      ],
    },
  ],
})

export const mutations = {
  toggleAside (state, value) {
    state.showMainAside = value
  },
  setSnackbar (state, payload) {
    state.showSnackbar = payload.value || false
    if (!state.showSnackbar) {
      state.snackbarText = ''
    }
    state.snackbarText = payload.text || ''
    state.snackbarColor = payload.color || '#ffffff'
    state.snackbarTimeout = payload.timeout || '5000'
  },
  setOrdersAmount (state, payload) {
    state.ordersAmount = payload
  },
}

export const actions = {
  //
}

export default {
  state,
  mutations,
  actions,
  namespaced: true,
}

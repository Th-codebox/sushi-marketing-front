export default {
  data () {
    return {
      rules: {
        required: [(v) => !!v || 'Обязательное поле'],
        number: [(v) => !isNaN(Number(v)) || 'Только цифры'],
        requiredNumber: [
          (v) => v !== '' || 'Обязательное поле',
          (v) => !isNaN(Number(v)) || 'Только цифры',
        ],
        email: [
          v => !!v || 'Обязательное поле',
          v => /.+@.+\..+/.test(v) || 'E-mail должен быть корректным',
        ],
        phone: [v => (!!v && v.match(/\+7\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}/)) || 'Укажите валидный номер оператора РФ'],
        selectMultipleRequired: [v => (!!v && !!v.length) || 'Выберите хотя бы один вариант'],
        slug: [(v) => (!!v && !!v.match(/^[a-zA-Z-]*$/g)) || 'Обязательное поле, только латиница'],
        description: [(v) => (v && v.length <= 300) || 'Не больше 300 символов'],
        requiredRadioButtonGroup: [v => !!v || 'Выберите хотя бы один пункт'],
      },
    }
  },
}

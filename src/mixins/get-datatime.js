import { DateTime } from 'luxon'

export default {
  data () {
    return {
      hours: '',
      minutes: '',
      day: DateTime.local().day,
      month: DateTime.local().monthShort,
      week: DateTime.local().weekdayLong,
      interval: null,
    }
  },
  methods: {
    getCurrentTime () {
      this.hours = DateTime.local().toFormat('HH')
      this.minutes = DateTime.local().toFormat('mm')
    },
  },
  mounted () {
    this.getCurrentTime()
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.getCurrentTime()
    }, 1000)
  },
  destroyed () {
    clearInterval(this.interval)
  },
}

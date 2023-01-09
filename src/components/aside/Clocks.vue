<template lang="html">
  <div class="clocks-component">
    <div class="flex a-center">
      <span class="time">{{ hours }}</span>
      <span class="separator">:</span>
      <span class="time">{{ minutes }}</span>
      <span class="date">{{ day }} {{ month }} <br />
        {{ week }}</span>
    </div>
  </div>
</template>

<script>
  import mixinGetDatatime from '@/mixins/get-datatime'

  export default {
    name: 'Clocks',
    mixins: [mixinGetDatatime],
  }
</script>

<style lang="scss" scoped>
  .clocks-component {
    padding-left: 27px;
    margin-bottom: 37px;

    .separator {
      display: inline-block;
      margin: 0 4px;
      font-size: 30px;
      font-weight: 900;
      color: #ffffff;
    }

    .time {
      display: block;
      padding: 14px 0 11px 0;
      width: 50px;
      background-color: #191919;
      border-radius: 10px;
      font-size: 24px;
      text-align: center;
      color: #ffffff;
      line-height: 1;
    }

    .date {
      display: inline-block;
      margin-left: 15px;
      color: #ffffff;
      line-height: 1;
    }
  }
</style>

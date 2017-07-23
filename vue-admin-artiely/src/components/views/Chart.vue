<template>
  <div class="list">
    <Row>
      <Col>
      <Card>
        <div class="echarts">
          <IEcharts :option="bar"  @ready="onReady" @click="onClick"></IEcharts>
        </div>
        <Button @click="doRandom">Random</Button>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import IEcharts from 'vue-echarts-v3/src/full.vue';
export default {
  name: 'list',
  components: { IEcharts },
  data() {
    return {
      bar: {
        title: {
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks','Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  watch: {

  },
  computed: {},
  methods: {
    doRandom() {
      const that = this;
      let data = [];
      for (let i = 0, min = 5, max = 99; i < 12; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min));
      }
      that.bar.series[0].data = data;
    },
    onReady(instance) {
      console.log(instance);
    },
    onClick(event, instance, echarts) {
      console.log(arguments);
    }
  },
  created() {

  }
}
</script>
<style scoped>
.echarts {
  height: 400px;
}
</style>
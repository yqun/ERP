<template>
  <div class="contract">
    <!-- 内容 -->
    <div class="main">
      <scroller lock-x height="100%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
        <div class="list">
          <group title="被评测人：">
            <cell is-link v-for="item in list"
                  :key="item.id"
                  @click.native="routerLink(item)">
              <div slot="title">
                {{item.participantName}}
              </div>
              <div>({{item.score || 0}}分)</div>
            </cell>
          </group>

        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
  export default {
    name: "salesmanScoreList",
    data() {
      return {
        list: [],
      }
    },
    mounted() {
      this.getMonthInfo();
    },
    methods: {
      // 下拉加载
      onScrollBottom () {},
      // 获取数据
      getMonthInfo() {
        const data = {
          evaluationId: this.$route.query.id,
          judge: JSON.parse(window.sessionStorage.getItem('data')).id
        };
        this.axios.get(`wechatErp/evaluation/getParticipantList`, {params: data})
          .then(res => {
            // console.log(res);
            const {data} = res;
            this.list = data;
          })
      },
      // 路由跳转
      routerLink(contract) {
        this.$router.push({
          path: '/applicae/salesmanScoreItem',
          query: {
            evaluationId: contract.evaluationId,
            userId: contract.userId
          }
        })
      }
    }
  }
</script>

<style scoped>
@import '../../../../assets/css/list.css';
.contract {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size:16px;
  background-color: #f8f8f8;
}
.main {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  /*background-color: #fff;*/
}
</style>

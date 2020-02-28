<template>
  <div>
    <group :gutter="0">
      <cell v-for="item of list" :key="item.id" @click.native="goToQuestion(item)">
        <div slot="title">
          <p>{{item.name}}</p>
          <p>{{item.createTime | momentDay}}</p>
        </div>
        <div> 
          <p>{{item.state?'已发布':'未发布'}}</p>
          <p>{{item.creatorName}}</p>
        </div>
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell } from 'vux'
export default {
  name: 'Query',
  components: { Group, Cell },
  data() {
    const data = JSON.parse(window.sessionStorage.getItem('data'));
    return {
      data,
      role: false, //角色身份 true 领导， false 员工
      list: [],
    }
  },
  mounted() {
    this.getlist()
  },
  methods: {
    getlist() {
      const arr = ['PRE_SALES_MANAGER', 'RESEARCH_DEVELOPMENT_MANAGER',
        'PROGRAMMER', 'CHAIRMANOFTHEBOARD',
        'MARKETING_GENERAL_MANAGER', 'GENERAL_MANAGER'];
      if (this.data.roleList) {
        this.data.roleList.forEach(item => {
          if (arr.indexOf(item.code) >= 0) {
            this.role = true
          }
        })
      }
      this.axios.get(`/wechatErp/cq/getCqList`)
      .then(res => {
        // console.log(res);
        const {data} = res;
        if (this.role) {
          this.list = data
        } else if (!this.role) {
          data.forEach(item => {
            if (item.kind == '2') {
              this.list.push(item)
            }
          })
        }
      })
    },
    goToQuestion(item) {
      console.log(this.seeData)
      let path = '';
      if (this.role) {
        path = '/applicae/statistics/allData'
      } else {
        path = '/applicae/question'
      }
      this.$router.push({
        path: path,
        query: {id: item.id}
      })
    }
  }
}
</script>

<style scoped lang="less">

</style>

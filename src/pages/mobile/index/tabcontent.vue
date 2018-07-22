<template>
   <div>
     <div class="contentwrap" v-for="(item,index) in contentList" :key="index">
                <div class="picwrap"></div>
                <div  class="contents">
                  <div class="maincontent">
                    <span><router-link :to="{path:'/mobiledetail',query: {projectId: item.projectId}}">{{item.name}}</router-link></span>
                    <span class="fr">
                      <span  v-bind:class="{newstar:parseInt(item.rating)>=5}"></span>
                      <span  v-bind:class="{newstar:parseInt(item.rating)>=4}"></span>
                      <span  v-bind:class="{newstar:parseInt(item.rating)>=3}"></span>
                      <span  v-bind:class="{newstar:parseInt(item.rating)>=2}"></span>
                      <span  v-bind:class="{newstar:parseInt(item.rating)>=1}"></span>
                      <span class="starhalf" v-if="item.rating*2/2%1!==0"></span>
                    </span>
                  </div>
                  <div class="simple" v-if="item.progress !== 0">{{item.intro}}</div>
                  <div class="simples" v-else>{{item.intro}}</div>
                  <div class="badge">
                    <span v-for="(items,indexs) in item.tag" :key="indexs"><mt-badge size="small" color="#F5F8FA">{{items.tagName}}</mt-badge></span>
                    <mt-badge size="small" color="#F5F8FA" style="float:right">{{item.projectDateStr}}:{{item.projectDate}}</mt-badge>
                  </div>
                  <div v-if="item.progress !== 0">
                    <div class="line">
                      <div class="progress" v-bind:style="{width:item.progress+'%'}"></div>
                      <span class="progressnumber">{{item.progress}}%</span>
                    </div>
                    <span style="float:right;margin-top: 3px;font-size: 12px;width:60px">{{item.totalLimit}}ETH</span>
                  </div>
                </div>
    </div>
   </div>
</template>

<script>
export default {
    props:{
        contentList:Array
    },
    mounted(){
      console.log(1)
    },
    watch:{
      contentList () {
        console.log(this.contentList)
      }
    }
}
</script>

<style lang="scss" scoped>
    .contentwrap {
  margin: 0 15px 20px;
  background-color: white;
  border-radius: 4px;
  height: 132px;
  padding: 15px;
  box-sizing: border-box;
  .maincontent {
    margin-bottom: 6px;
    font-weight: bold;
  }
  .contents {
    width: calc(100% - 70px);
    padding-left: 10px;
    float: right;
  }
  .picwrap {
    height: 60px;
    width: 60px;
    margin: 21px 0 0 0;
    border-radius: 25px;
    background: url("../../../images/github.png") no-repeat 100%;
    float: left;
  }
  .fr {
    float: right;
    height: 20px;
    span {
      padding-left: 20px;
    }
  }
  .newstar {
    background: url("../../../images/star-on.png") no-repeat center center;
    background-size: 16px 16px;
  }

  .starhalf {
    background: url("../../../images/star-half.png");
    background-size: 16px 16px;
  }
  .simple {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 6px;
  }
  .simples {
    overflow: hidden;
    // white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 6px;
    height: 40px;
    line-height: 20px;
  }
  .badge {
    height: 20px;
    font-size: 12px;
  }
  .line {
  float: left;
  height: 2px;
  border-radius: 1px;
  background-color: #d8d8d8;
  margin-top: 12px;
  width: calc(100% - 70px);
}
.progress {
  height: 2px;
  background-color: #2179fe;
  border-radius: 1px;
  float: left;
}
.progressnumber {
  font-size: 12px;
  color: #2179fe;
}
}
</style>

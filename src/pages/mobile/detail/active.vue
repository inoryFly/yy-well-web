<template>
    <div>
         <div class="detailheader">
            <mt-header title="参与众筹">
                <mt-button icon="back" slot="left" @click="goreturn"></mt-button>
            </mt-header>

             <div class="photoborded">
                 <div class="halfcircle"></div>
                <img :src="$store.state.details.iconUrl" class="realphoto"/>
            </div>
        </div>

        <div class="contentwrap">
            <div class="headerpic">
                <div class="piccontent qutao">
                    <div>剩余额度(%)</div>
                    <span>{{$store.state.details.surplusLimit}}</span>
                </div>
                <div class="piccontent number">
                    <div>起投数量(个)</div>
                    <span>{{$store.state.details.singleMinLimit}}</span>
                </div>
                <div class="piccontent time">
                    <div>截止时间</div>
                    <span>{{$store.state.details.projectEndDate}}</span>
                </div>
            </div>
            <div class="erword">
                请转账至以下智能合约地址，待转账确认后可在代投记录中查询
            </div>

            <div class="er">
                <img :src="$store.state.details.shareImgUrl">
                <div class="diser" v-if="!$store.state.details.isStart">
                    <p style="padding-top:65px">{{hour}}:{{minute}}:{{seconds}}</p>
                </div>
            </div>
            <div class="links">{{$store.state.details.contractAddress}}</div>
            <div style="text-align:center;color:#2179FE;">复制链接</div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            hour:0,
            minute:0,
            seconds:0,
            time:undefined
        }
    },
    mounted () {
        console.log(this.$store.state.details)
        if(!this.$store.state.details.isStart){
            var start=new Date()
            var end=new Date(this.$store.state.details.projectStartDate);
            var ms=end.getTime()-start.getTime();
            this.hour=parseInt(ms/(1000*60*60));
            this.minute=parseInt(ms%(1000*60*60)/(1000*60));
            this.seconds=ms%1000;
            var _this=this;
            if(this.hour!=0||this.minute!=0||this.seconds!=0){
                this.time=setInterval(()=>{
                    if(_this.seconds!=0){
                        _this.seconds--;
                    }else {
                        if(_this.minute!=0){
                            _this.seconds=59
                            _this.minute--;
                        }else{
                            if(_this.hour!=0){
                                _this.seconds=59
                                _this.minute=59;
                                _this.hour--;
                            }
                        }
                    }
                    if(_this.seconds==0&&_this.minute==0&&_this.hour==0){
                        clearInterval(_this.time)
                    }
                },1000)
            }
        }
        
    },
    methods:{
        goreturn () {
            this.$router.go(-1)
        }
    }
}
</script>


<style lang="scss" scoped>
.detailheader {
  .photoborded {
    width: 72px;
    height: 72px;
    margin: 36px auto 0;
    position: relative;
  }
  .halfcircle{
          width: 100%;
    height: 36px;
    background: #2179FE ;
    position: absolute;
    bottom: 0;
    border-radius: 0 0 36px 36px;
  }
  .realphoto {
    position: absolute;
    width: 68px;
    height: 68px;
    left: -3px;
    top: -6px;
  }
}
.contentwrap {
  background-color: white;
  height: 100vh;
  width: 90%;
  margin: -145px auto 15px;
  border-radius: 9px;
  .headerpic {
    padding: 75px 15px 10px;
    border-bottom: 1px solid #efefef;
    margin-bottom: 30px;
    clear: both;
    height: 158px;
    box-sizing: border-box;
    .piccontent {
      padding-top: 22px;
      width: 33%;
      height: 60px;
      text-align: center;
      float: left;
    }
    .qutao {
      background: url("../../../images/quato.png") no-repeat center 0;
      background-size: 22px;
    }
    .number {
      background: url("../../../images/number.png") no-repeat center 0;
      background-size: 22px;
    }
    .time {
      background: url("../../../images/time.png") no-repeat center 0;
      background-size: 22px;
    }
  }
  .erword{
      text-align:center;margin-bottom:30px;padding: 0 25px;line-height: 24px;
  }
  .er{
    //   background:url('../../../images/erweima.png') no-repeat center center;
    // background-size: 103px 103px;
      width: 103px;
      height: 103px;
      margin:0 auto 30px;
      border-radius: 4px;
      position: relative;
      img{
          position: absolute;
          top:0;left: 0;
          z-index: 1;
          width: 103px;height: 103px;
      }
  }
  .diser{
      position: absolute;
      z-index: 10;
       width: 103px;height: 103px;
      background:rgba(33,121,254,0.96) url('../../../images/clock.png') no-repeat center 27px;
      background-size: 28px 33px;
      height:100%;
      border-radius: 4px;
      color: white;
      font-size: 20px;
      text-align: center;
  }
  .links{
      padding:0 15px 10px;
    overflow: hidden;
    font-size: 12px;
    text-align: center;
    word-break: break-all;
  }
}
</style>


<template>
    <div>
         <div class="detailheader">
            <mt-header title="参与众筹">
                <mt-button icon="back" slot="left"></mt-button>
            </mt-header>

             <div class="photoborded">
                <img src="../../../images/github.png" class="realphoto"/>
            </div>
        </div>

        <div class="contentwrap">
            <div class="headerpic">
                <div class="piccontent qutao">
                    <div>剩余额度(%)</div>
                    <span>70</span>
                </div>
                <div class="piccontent number">
                    <div>起投数量(个)</div>
                    <span>1</span>
                </div>
                <div class="piccontent time">
                    <div>截止时间</div>
                    <span>2017/12/12</span>
                </div>
            </div>
            <div style="text-align:center;margin-bottom:30px;">
                请转账至以下智能合约地址，待转账确认后可在代投记录中查询
            </div>

            <div class="er"></div>
            <div class="links">0x38094dd0422D8556Ad5cB921Bd58BBb7AD5320A7</div>
            <div style="text-align:center">复制链接</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.detailheader {
  .photoborded {
    width: 72px;
    height: 72px;
    margin: 36px auto 0;
  }
  .realphoto {
    width: 72px;
    height: 72px;
  }
}
.contentwrap {
  background: url("../../../images/background.png") no-repeat 0 0;
  background-size: 100% 100%;
  // background-color: white;
  height: 100vh;
  width: 300px;
  margin: -150px auto 15px;
  .headerpic {
    padding: 75px 15px 30px;
    border-bottom: 1px solid #efefef;
    margin-bottom: 30px;
    clear: both;
    height: 175px;
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
  .er{
      background:url('../../../images/erweima.png') no-repeat center center;height:103px;
      background-size: 103px 103px;
      margin-bottom: 50px;
  }
}
</style>


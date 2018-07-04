<template>
  <footer>
    <div class="container">
        <div class="items">
            <strong class="ccc">友情链接</strong>
          <ul class="link">
            <li>
              <a href="http://www.qukuaiwang.com.cn/">区块链</a>
            </li>
            <li>
              <a href="http://www.qukuaiwang.com.cn/">比特儿</a>
            </li>
            <li>
              <a href="http://www.qukuaiwang.com.cn/">火币</a>
            </li>
            <li>
              <a href="http://www.qukuaiwang.com.cn/">金色财经</a>
            </li>
          </ul>
        </div>
        <div class="items">
          <strong class="ccc">关于我们</strong>
          <ul class="link">
            <li>
              <a href="http://www.qukuaiwang.com.cn/">简介</a>
            </li>
            <li>
              <a @click="$router.push('termofuse')" href="#/termofuse">使用条款</a>
            </li>
            <li>
              <a @click="$router.push('privacypolicy')" href="#/privacypolicy">隐私政策</a>
            </li>
          </ul>
        </div>
        <div class="items">
          <strong class="ccc">联系我们</strong>
          <ul class="link">
            <li>
              <a href="http://www.qukuaiwang.com.cn/">yhbetter1@gmail.com</a>
            </li>
          </ul>
        </div>
        <div class="items">
            <strong>下载WELL</strong>
            <div class="qkl-btn-group">
                <span class="qkl-btn qkl-primary-btn"><i class="icon-device icon-ios"></i>iPhone版</span>
                <span class="qkl-btn qkl-default-btn"><i class="icon-device icon-android"></i>Android版</span>
            </div>
        </div>
      <div class="items" style="width: 140px">
            <strong>联系客服</strong>
            <div class="erweima">
                <img src="../images/erweima.png">
            </div>
        </div>
        <div class="items" style="width: 140px">
            <strong>公众号</strong>
            <div class="erweima">
                <img src="../images/erweima.png">
            </div>
        </div>
    </div>
    </footer>
</template>

<script>
export default{
  name: 'qkl-footer'
}
</script>

<style lang="scss" scoped>
footer{
    width: 100%;
    height: 265px;
    margin-top: 30px;
    padding: 25px 0 40px;
    background: url("../images/footer.png") no-repeat center center;
    background-size: 100% 100%;
    .container{
        font-size: 16px;
        width: 1100px;
        margin: 0 auto;
    }
    strong{
        display: block;
        margin-top: 50px;
        margin-bottom: 30px;
        color: #000;
    }
    .items{
        display: inline-block;
        vertical-align: top;
        width: 180px;
        &:first-child{
            /*margin-right: 140px;*/
        }
        &:last-child{
            /*width: 100px;*/
            /*margin-left: 248px;*/
        }
    }
    .links{
        display: flex;
        flex-wrap: wrap;
        li a{
            flex: 1;
            color: #010101;
        }
    }
    .items li{
      line-height:20px;
      font-size:12px;
      text-align: center;
    }
    .items .ccc{
      text-align: center;
    }
    .qkl-btn-group{
        width: 105px;
    }
    .qkl-btn{
        position: relative;
        padding-left: 20px;
        display: inline-block;
        width: 104px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        font-size: 10px;
        color: #fff;
        cursor: pointer;
    }
    .qkl-primary-btn{
        background: #2487f8;
    }
    .qkl-default-btn{
        margin-top: 15px;
        background: #8696a9;
    }
    .icon-device{
        position: absolute;
        top: 8px;
        left: 12px;
        width: 18px;
        height: 20px;
    }
    .icon-android{
        background: url('../images/android.png') no-repeat center center;
        background-size: 100% 100%;
    }
    .icon-ios{
        background: url('../images/ios.png') no-repeat center center;
        background-size: 100% 100%;
    }
    .erweima{
        img{
            display: block;
            width: 95px;
            height: 95px;
        }
    }
}
</style>

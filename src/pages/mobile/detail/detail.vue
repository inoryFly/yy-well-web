<template>
    <div>
        <div class="detailheader">
            <mt-header title="项目详情">
                <mt-button icon="back" slot="left"></mt-button>
                <mt-button  slot="right">
                    <img src="../../../images/share.png" width="16px;"/>
                </mt-button>
            </mt-header>

             <div class="photo">
                    <img src="../../../images/github.png" class="realphoto"/>
            </div>

            <div class="urlwrap">
                <div style="float:left">
                    <img src="../../../images/twitter.png" >
                </div>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.mint-header {
  background-color: transparent;
}
.detailheader{
    height: 260px;
    background: url('../../../images/headers.png') no-repeat 0;
    background-size: 100% 100%;
    .photo{
        width: 84px;
        height: 84px;
        margin: 32px auto;
        background: url('../../../images/photo.png') no-repeat 0;
        background-size: 100% 100%;
    }
    .realphoto{
        width: 74px;
    height: 74px;
    margin: 5px;
    border-radius: 37px;
    }
    .urlwrap{
        border-radius: 4px;
        background-color: white;
        height: 115px;
        margin: 15px;
    }
}
</style>


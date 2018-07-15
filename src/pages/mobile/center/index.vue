<template>
    <div>
        <mt-header fixed title="个人中心">
            <router-link to="/login" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>

        <div>
            <mt-cell title="绑定邮箱" is-link>
                <span style="color:green">去绑定</span>
            </mt-cell>
            <mt-cell title="绑定手机号" is-link>
                <span style="color:green">去绑定</span>
            </mt-cell>
            <mt-cell title="绑定以太坊钱包" is-link>
                <span style="color:green">去绑定</span>
            </mt-cell>
        </div>
    </div>
</template>

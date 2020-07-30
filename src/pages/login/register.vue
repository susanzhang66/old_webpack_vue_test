<!--
 * @Author: your name
 * @Date: 2020-05-19 15:45:43
 * @LastEditTime: 2020-05-25 17:42:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/components/login/register.vue
--> 

<template>
<div>
<yd-navbar title="快速注册" bgcolor="#40cd89" color="#fff" fontsize=".3rem">
		<router-link to="#" slot="left">
				<yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
		</router-link>
</yd-navbar>
 <yd-cell-group>
		<yd-cell-item>
				
				<yd-icon slot="icon" name="ucenter-outline" size=".5rem"></yd-icon>
				
				<yd-input slot="right" v-model="mobile" placeholder="请输入手机号码"></yd-input>
		</yd-cell-item>

		<yd-cell-item>
				
				<yd-icon slot="icon" name="setting" size=".5rem"></yd-icon>
				
				<yd-input slot="right" type="password" v-model="passwords" placeholder="请输入密码（6位以上）"></yd-input>
		</yd-cell-item>
    <yd-cell-item>
				
				<yd-icon slot="icon" name="setting" size=".5rem"></yd-icon>
				<yd-input slot="right" type="password" v-model="passwords2" placeholder="请再次请输入密码"></yd-input>
		</yd-cell-item>

		<yd-cell-item>
				<yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
				<input type="text" slot="right" placeholder="请输入手机验证码" v-model="imgCode">
				<!-- ↓↓关键代码是这里↓↓ -->
				<yd-sendcode slot="right" 
											v-model="start1" 
											@click.native="sendCode1" 
											type="warning"
											bgcolor="#40cd89"
											color="#fff" 
				></yd-sendcode>
				<!-- ↑↑关键代码是这里↑↑ -->

		</yd-cell-item>
 
</yd-cell-group>

<div class="ui_tas ui_mt02 ui_ml02 ui_clr_666">注册视为同意<a href="#">鲜果直通车注册协议</a></div>
<yd-button-group>
		<yd-button size="large" type="primary" bgcolor="#40cd89" :disabled="btnDisable" color="#fff" @click.native="handleClick">注册</yd-button>
</yd-button-group>
</div>
</template>
<script>
import Utils, {singleton} from '@/common/Utils'
export default {
		name: 'login',
		data() {
			return {
					mobile: '',
					passwords: '',
          passwords2: '',
					imgCode: '',
					btnDisable: false,
					start1: false
			}
		},
		methods: {
			handleClick() {
					let validator = singleton( this.validtaFunc )();

					var errorMsg = validator.start()
					if( errorMsg  ){
						this.$dialog.toast({
								mes: errorMsg || '请填写完整信息',
								timeout: 2500
						})
					}else{
						this.$dialog.confirm({
								title: '选填标题',
								mes: '我有一个小毛驴我从来也不骑！',
								opts: () => {
										this.$dialog.toast({mes: '你点了确定', timeout: 1000});
								}
						});
					}
			},
			validtaFunc (){
					var Validator = Utils.validate(), validator = new Validator(),self = this;
					validator.add( self.mobile, [{ruleName:'isNonEmpty',errorMsg:'手机号码不能为空'},{ruleName:'isMobile',errorMsg:'请填写正确的手机号码'}]);
					validator.add( self.passwords, [{ruleName:'isNonEmpty',errorMsg:'密码不能为空'},{ruleName:'minLength:6',errorMsg:'密码不能小于6位数'}]);
					validator.add( self.passwords2, [{ruleName:'isNonEmpty',errorMsg:'请再次输入密码'},{ruleName:'issameNum:'+self.passwords,errorMsg:'两次密码输入不一致'}]);
					validator.add( self.imgCode, [{ruleName:'isNonEmpty',errorMsg:'短信验证码不能为空'}]);
					return validator;
			},
			sendCode1() {
				this.$dialog.loading.open('发送中...');
				setTimeout(() => {

						this.start1 = true;
						this.$dialog.loading.close();

						this.$dialog.toast({
								mes: '已发送',
								icon: 'success',
								timeout: 1500
						});

				}, 1000);
			}
		}	
}
</script>

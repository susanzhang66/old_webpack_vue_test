<template>
<div>
<yd-navbar title="请登录" bgcolor="#40cd89" color="#fff" fontsize=".3rem">
		<router-link to="#" slot="left">
				<yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
		</router-link>
</yd-navbar>

<div style="margin-top:.6rem">
 <yd-cell-group>
		<yd-cell-item>
				<span slot="left" style="padding-right:.5rem">
						<yd-icon slot="icon" name="ucenter-outline" size=".5rem"></yd-icon>
				</span>
				<yd-input slot="right" v-model="mobile" placeholder="请输入手机号码"></yd-input>
		</yd-cell-item>

		<yd-cell-item>
				<span slot="left" style="padding-right:.5rem">
						<yd-icon slot="icon" name="setting" size=".5rem"></yd-icon>
				</span>
				<yd-input slot="right" type="password" v-model="passwords" placeholder="请输入密码（6位以上）"></yd-input>
		</yd-cell-item>
		<yd-cell-item>
				<span slot="left" style="padding-right:.5rem">
						<yd-icon slot="icon" name="compose" size=".5rem"></yd-icon>
				</span>
				<span slot="right" class="u_fb_ae_ai u_nw" style="flex:1">
					<yd-input  type="number" v-model="imgCode" placeholder="请输入验证码"></yd-input>
					<img src="" width="90" height="43" class="u_fb_pc">
				</span>
				
		</yd-cell-item>
</yd-cell-group>
</div>
<div class="ui_mt10">
<yd-button-group>
		<yd-button size="large" type="primary" bgcolor="#40cd89" :disabled="btnDisable" color="#fff" @click.native="handleClick">登录</yd-button>
</yd-button-group>
</div>
<div class="btn_small2 ui_mt02 ui_clr_green">
	<yd-flexbox>
			<div>立即注册</div>
			<yd-flexbox-item></yd-flexbox-item>
			<div>找回密码</div>
	</yd-flexbox>
</div>
<fieldset class="ui_bt ui_mt10">
    <legend class="ui_tac ui_clr_999">第三方登录</legend>
	<div class="u_fb ui_h_1_5">
		<div class="ui_rel u_f ui_pr1 u_fb_pe">
			<i class="icon_weixin"></i>
			<span class="ui_db ui_pt1 ui_clr_666">微信</span>
		</div>
		<div class="ui_rel u_f ui_pl25 ">
			<i class="icon_qq"></i>
			<span class="ui_db ui_pt1 ui_clr_666">QQ</span>
		</div>
	</div>
</fieldset>

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
					imgCode: '',
					btnDisable: false
			}
		},
		methods: {
			handleClick() {
					// this.$store.dispatch('getCenterList')
					// this.$store.dispatch('getGoodsList')
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
					validator.add( self.imgCode, [{ruleName:'isNonEmpty',errorMsg:'短信验证码不能为空'}]);
					return validator;
			}
		}	
}
</script>



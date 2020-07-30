/**
 * 封装函数,限制函数的执行次数,返回一个只允许被调用有限次数的函数,超过次数的调用会报出异常
 * @param {Function} fn 需要被封装的函数
 * @param {Number} lim 限制的次数,默认为1次
 */
export function $limitCalls(fn,lim) {
	var lim = lim||1;
	return function() {
		if (lim<=0)
			return false;
		lim--;
		fn.apply(this, arguments);
	}
}
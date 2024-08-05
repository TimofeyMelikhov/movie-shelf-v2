export const formatNum = (num: number): string => {
	const formatter = Intl.NumberFormat('ru', {
		notation: 'standard'
	})
	return formatter.format(num)
}

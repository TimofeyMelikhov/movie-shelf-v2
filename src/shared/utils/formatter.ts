export const formatNum = (num: number): string => {
	const formatter = Intl.NumberFormat('ru', {
		notation: 'standard'
	})
	return formatter.format(num)
}

export function formatDate(dateStr: string): string {
	const dateObj = new Date(dateStr)

	const months = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря'
	]

	const day = dateObj.getDate()
	const month = months[dateObj.getMonth()]
	const year = dateObj.getFullYear()

	return `${day} ${month} ${year}`
}

export function convertMinutesToHours(minutes: number) {
	let hours = Math.floor(minutes / 60)
	let mins = minutes % 60
	return hours + ' ч ' + mins + ' мин'
}

export function ageTransformation(age: number | undefined) {
	if (!age) {
		return ''
	}
	let count = age % 100
	if (count >= 10 && count <= 20) {
		return 'лет'
	} else {
		count = age % 10
		if (count === 1) {
			return 'год'
		} else if (count >= 2 && count <= 4) {
			return 'года'
		} else {
			return 'лет'
		}
	}
}

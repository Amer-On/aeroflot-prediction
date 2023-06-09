export const itemsMon = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь',];
export const itemsDay = [];
for (let i = 1; i <= 31; i++) {
    itemsDay.push(i);
}

export function get_mon_id(month) {
    return itemsMon.indexOf(month) + 1
}



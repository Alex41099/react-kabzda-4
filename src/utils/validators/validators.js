export const required = (value) => { // создаем фукнцию
    if (value) return undefined // если в парамете value есть значение то ничего не делаем
    return "Вы не заполнили поле!" // иначе возвращаем этот текст!
}


export const maxLengthCreator = (maxLength) => (value) => { // Тут используем двойную функцию
    if (value.length > maxLength) return `Превышен лимит букв в ${maxLength}`
    return undefined
}
export const convertObjectWithTest = (object: any) => {
    let newArray = []
    for (const [key, value] of Object.entries(object)) {
        if (Array.isArray(value)) {
            //проверка: ввёл ли пользователь вариант ответа
            if (value.filter(elem => elem !== false).length === 0) return null
        }
        newArray.push({[key]: value})
    }
    return newArray
}
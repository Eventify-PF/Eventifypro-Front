export const formatDateToLocal = (dateStr, locale = 'en-US') => {
    const date = new Date(dateStr);
    
    // Ajustar la fecha para reflejar la zona horaria local
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    };
    
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(localDate);
};

import book from '../book_all.json';


const toArabicNum = number => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return number.toString().split('').map(digit => arabicDigits[digit]).join('');
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

export default {
    about: book.about['ar'],
    chapters: book.chapters.map(c => ({
        id: toArabicNum(c.id),
        ...c['ar']
    }))
};

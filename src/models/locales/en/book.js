import book from '../book_all.json';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

export default {
    about: book.about['en'],
    chapters: book.chapters.map(c => ({
        id: c.id,
        ...c['en']
    }))
};


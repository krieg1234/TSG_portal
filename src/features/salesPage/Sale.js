import { uniqueId } from 'lodash';

export class Sale {
  static headerField = 'header';
  static authorField = 'author';
  static priceField = 'price';
  static phoneField = 'phone';
  static emailField = 'email';
  static categoryIdField = 'categoryId';
  static contentField = 'content';
  static allFields = [
    this.headerField,
    this.authorField,
    this.priceField,
    this.phoneField,
    this.emailField,
    this.categoryIdField,
    this.contentField,
  ];

  constructor(data) {
    if (data) {
      const fields = Object.keys(data);
      fields.forEach((f) => {
        if (this.allFields.includes(f)) this[f] = data[f];
      });
    }

    this.date = new Date();
    this.id = uniqueId();
  }

  getId() {
    return this.id;
  }

  setHeader(header) {
    this.header = header;
  }

  setAuthor(author) {
    this.author = author;
  }

  setEmail(email) {
    this.email = email;
  }

  setPhone(phone) {
    this.phone = phone;
  }

  setContent(content) {
    this.content = content;
  }

  setCategoryId(categoryId) {
    this.categoryId = categoryId;
  }

  setPrice(price) {
    this.price = price;
  }
}

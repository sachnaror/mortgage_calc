
# 🏡 Mortgage Calculator 🏦

Welcome to **Mortgage  Calculator**, the app that turns the boring world of loans into a rollercoaster of humor and finance! Whether you're buying a mansion or a cardboard box, we calculate everything with precision and wit!

---

## 📋 Features

- **Loan Amount:** Enter how much money you need to borrow (no judgment, we all dream big!).
- **Interest Rate:** Specify the rate your bank will use to snatch your soul.
- **Loan Term:** Choose the number of years you'll be stuck paying (30 years? Forever? Your choice!).
- **Credit Score:** Tell us your score—no need to lie, we’re not your bank.
- **Property Type:** Is it Residential, Commercial, or a haunted mansion? We calculate for all!
- **Property Tax Rate:** Because the government also wants a piece of the pie.
- **Home Insurance Cost:** For those "just in case your neighbor's BBQ goes wild" scenarios.

---

## 🎉 Why This App?

- **Accurate Results:** Get detailed calculations for your monthly payment and total loan cost.
- **Save to Database:** Data saved directly to MongoDB so you can revisit your financial nightmares later.
- **Full Stack Integration:** Works with Angular frontend and Express backend. Even your bank might be jealous.

---

## 🚀 Getting Started

1. Clone the repo (it's free, we promise!):
   ```bash
   git clone https://github.com/sachnaror/mortgage_calc
   ```

2. Install dependencies (both frontend and backend):
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Run the backend:
   ```bash
   node server.js
   ```

4. Run the frontend:
   ```bash
   ng serve
   ```

5. Visit the app at:
   ```
   http://localhost:4200
   ```

---

## 🛠️ Technologies Used

- **Frontend:** Angular (The superhero of SPAs)
- **Backend:** Express.js (Fast, sleek, and steals your loan data... kidding!)
- **Database:** MongoDB (Your data is safe here... we think)
- **Styling:** Bootstrap (We made it pretty for you)

---

## 🤣 Fun Facts

- Did you know that the average person spends 20 years paying off a mortgage? Use this app and you’ll know EXACTLY how depressing that is!
- My code is 99.9% bug-free. The 0.1%? That’s for feature updates we forgot.

---

## 🤓 Example API Calls

Save a mortgage:
```bash
curl -X POST http://localhost:3000/calculate -H "Content-Type: application/json" -d '{"loanAmount":200000,"interestRate":5,"loanTerm":30,"creditScore":"Excellent","propertyType":"Residential","propertyTaxRate":1.2,"insuranceCost":500}'
```

Fetch all saved mortgages:
```bash
curl -X GET http://localhost:3000/mortgages
```

---

## 📞 Support

Have a question? Want to submit a feature request? Or just want to send us a joke? Reach out at:
- Email: **schnaror@gmail.com**
- Twitter: [@sachinhep](https://twitter.com/sachinhep)

---

## ❤️ Contributors

- Me, Ofcourse, for building this app! 🎉
- Ginger Tea, for keeping me 'Tearated'. ☕

---

## 🚧 Disclaimer

I hate loan/mortagges and credit cards. I never use these financial instruments.

---

Enjoy the journey of property ownership with my **Mortgage Calculator**!

Stay tuned for a lot more features to come by  🏠✨

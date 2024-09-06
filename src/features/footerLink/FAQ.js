import {useState} from 'react'
function FAQ()
{
   
   const questions = [
      {
        question: "Q1: How to order?",
        answers: [
          "Choose your desired product",
          "Select the required quantity & Add to Cart",
          "Click on 'Check Out'",
          "Confirm your address & preferred mode of payment",
          "Your order has been successfully placed"
        ],
      },
      {
        question: "Q2: How to use cart?",
        answers: [
          "You can access your cart by clicking at the top right corner of your web/app screen",
          "Add items to your cart by clicking on Add to Cart"

        ],
      },
      {
        question: "Q3: How to login?",
        answers: [
          "Click on Login or Register",
          "Add all your respective details such as Email,password"
        ],
      },
      {
         question: "Q4: Do I have to order online?",
         answers: [
           "Yes, all orders must be placed online through the web/app as E-Pharma is the first solution which delivers various healthcare products to consumers and retailers at their doorstep."
         ],
       },
       {
         question: "Q5: Can I cancel my order?",
         answers: [
            "Yes, You can cancel your order anytime before shipment. Once the order has been shipped from our warehouses to you, you will not be able to cancel it."
         ],
       },
       {
         question: "Q6: Do you have physical shops?",
         answers: [
            "No, E-Pharma is the  e-health care solution which delivers various healthcare products to consumers at their doorstep"
         ],
       },
    ];
  

   const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
   <div className=" min-h-screen bg-white">
    <h1 className=" flex align-middle justify-center text-purple-900 text-2xl font-bold">Frequent Asked Questions</h1>
      <div className="mx-10">
    <div>
      {questions.map((quest, index) => (
        <div key={index}>
          <div className=" mt-10 mx-10 bg-gray-200"> 
          <h1 className="flex items-center text-purple-900 text-2xl font-bold cursor-pointer p-3 shadow-md" onClick={() => handleQuestionClick(index)}>
           {quest.question}
          </h1>
          </div>
          {activeIndex === index && (
            <ul className="mx-10 mt-4">
              {quest.answers.map((answer, answerIndex) => (
          <li key={answerIndex}>
            <span className="font-black">.</span> {answer}
          </li>
           ))}
           
            </ul>
          )}
        </div>
      ))}
    </div>
    </div>
    </div>
  );
}
export default FAQ;
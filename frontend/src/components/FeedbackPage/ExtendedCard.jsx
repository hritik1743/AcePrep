// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Gradient from "../partial/Gradient";

// // Assuming geminiResponse is already available as data
// const ExtendedCard = () => {
//   const [geminiResponse, setGeminiResponse] = useState(null);
//   const { assessmentId } = useParams();

//   // Fetch the geminiResponse data on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     fetch("http://localhost:5000/api/geminiResponse", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         //console.log("Fetched data:", data); // Log the data to check its structure

//         // Assuming the array is under 'geminiResponse'
//         const dataArray = data.geminiResponse || [];

//         if (Array.isArray(dataArray)) {
//           const filteredData = dataArray.find(
//             (item) => item._id === assessmentId
//           );

//           if (filteredData) {
//             console.log(filteredData);
//             setGeminiResponse([filteredData]); // Set the state with the matching item wrapped in an array
//           } else {
//             console.warn("No matching data found for the specified _id");
//             setGeminiResponse([]); // Handle the case where no data matches
//           }
//         } else {
//           console.error(
//             "Expected data.geminiResponse to be an array but received:",
//             typeof dataArray
//           );
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, [assessmentId]);

//   if (!geminiResponse) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <main className="flex flex-col flex-grow relative isolate px-6 pt-14 lg:px-8 pb-24">
//       {" "}
//       {/* Added padding bottom here */}
//       <Gradient />
//       <h1 className="text-3xl font-bold mb-4 mt-6">Assessment Results</h1>
//       {geminiResponse.length === 0 ? (
//         <p className="text-lg leading-8 text-gray-600">No data available.</p>
//       ) : (
        
//         geminiResponse.map((assessment, index) => (
//           <div key={assessment._id} className="space-y-8">
//             {/* Display Assessment Date and Time */}
//             <div className="text-lg leading-8 text-gray-600">
//               <p>
//                 <strong>Date:</strong>{" "}
//                 {new Date(assessment.responseDate).toLocaleDateString()}
//               </p>
//               <p>
//                 <strong>Time:</strong> {assessment.responseTime}
//               </p>
//             </div>

//             {/* Display Responses */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-900">Responses</h2>
//               {assessment.responses.map((response, idx) => (
//                 <div key={idx} className="p-4 border-b">
//                   <p>
//                     <strong>Question:</strong> {response.question}
//                   </p>
//                   <p>
//                     <strong>Answer:</strong> {response.answer}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Display Assessment Details */}
//             <div className="space-y-4">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 Assessment Details
//               </h2>
//               {assessment.assessments.rating.map((rating, idx) => (
//                 <div key={idx} className="p-4 border-b">
//                   <p>
//                     <strong>Rating:</strong> {rating} <br />
//                     <strong>Grammar Review:</strong>{" "}
//                     {assessment.assessments.grammarReview[idx]} <br />
//                     <strong>Question Type:</strong>{" "}
//                     {assessment.assessments.questionType[idx]} <br />
//                     <strong>More Appropriate Answer:</strong>
//                     {assessment.assessments.moreAppropriateAnswer[idx]} <br />
//                     <strong>Satisfaction:</strong>{" "}
//                     {assessment.assessments.satisfied[idx]} <br />
//                     <strong>Tone:</strong> {assessment.assessments.tone[idx]}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </main>
//   );
// };

// export default ExtendedCard;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Gradient from "../partial/Gradient";

const ExtendedCard = () => {
  const [geminiResponse, setGeminiResponse] = useState(null);
  const { assessmentId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/geminiResponse", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const dataArray = data.geminiResponse || [];

        if (Array.isArray(dataArray)) {
          const filteredData = dataArray.find(
            (item) => item._id === assessmentId
          );

          if (filteredData) {
            setGeminiResponse([filteredData]); // Wrap in array for mapping
          } else {
            console.warn("No matching data found for the specified _id");
            setGeminiResponse([]); // Show "No data available"
          }
        } else {
          console.error("Expected an array for geminiResponse");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [assessmentId]);

  if (!geminiResponse) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col flex-grow relative isolate px-6 pt-14 lg:px-8 pb-24">
      <Gradient />
      <h1 className="text-3xl font-bold mb-4 mt-6">Assessment Results</h1>
      {geminiResponse.length === 0 ? (
        <p className="text-lg leading-8 text-gray-600">No data available.</p>
      ) : (
        geminiResponse.map((assessment) => (
          <div key={assessment._id} className="space-y-8">
            {/* Display Assessment Date and Time */}
            <div className="text-lg leading-8 text-gray-600">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(assessment.responseDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {assessment.responseTime}
              </p>
            </div>

            {/* Display Responses */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Responses</h2>
              {assessment.responses?.map((response, idx) => (
                <div key={idx} className="p-4 border-b">
                  <p>
                    <strong>Question:</strong> {response.question}
                  </p>
                  <p>
                    <strong>Answer:</strong> {response.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Display Assessment Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Assessment Details
              </h2>
              {assessment.assessments &&
                Array.isArray(assessment.assessments.rating) &&
                assessment.assessments.rating.map((rating, idx) => (
                  <div key={idx} className="p-4 border-b">
                    <p>
                      <strong>Rating:</strong> {rating} <br />
                      <strong>Grammar Review:</strong>{" "}
                      {assessment.assessments.grammarReview?.[idx] || "N/A"} <br />
                      <strong>Question Type:</strong>{" "}
                      {assessment.assessments.questionType?.[idx] || "N/A"} <br />
                      <strong>More Appropriate Answer:</strong>{" "}
                      {assessment.assessments.moreAppropriateAnswer?.[idx] || "N/A"}{" "}
                      <br />
                      <strong>Satisfaction:</strong>{" "}
                      {assessment.assessments.satisfied?.[idx] || "N/A"} <br />
                      <strong>Tone:</strong>{" "}
                      {assessment.assessments.tone?.[idx] || "N/A"}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default ExtendedCard;


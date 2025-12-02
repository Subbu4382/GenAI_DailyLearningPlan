// // src/pages/DailyPlanForm.jsx
// import React, { useState } from "react";
// import "./DailyPlan.css";

// /**
//  * Optional:
//  * You can pass `goals` as a prop = [{ id, title }, ...]
//  * For now, we'll keep a simple static example list.
//  */
// const sampleGoals = [
//   { id: 1, title: "Python Basics" },
//   { id: 2, title: "SQL Fundamentals" },
//   { id: 3, title: "React Beginner" },
// ];

// export default function DailyPlan({ goals = sampleGoals }) {
//   const [plan, setPlan] = useState({
//     goal_id: "",
//     date: "",
//     topics: "",
//     planned_hours: "",
//     is_completed: false,
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setPlan({
//       ...plan,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const validate = () => {
//     const newErrors = {};

//     if (!plan.date) newErrors.date = "Date is required";
//     if (!plan.topics) newErrors.topics = "Topics are required";

//     if (!plan.planned_hours) {
//       newErrors.planned_hours = "Planned hours are required";
//     } else if (Number(plan.planned_hours) < 1) {
//       newErrors.planned_hours = "Hours must be at least 1";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     console.log("Daily plan created:", plan);
//   };

//   return (
//     <div className="daily-root">
//       <div className="daily-card">
//         <h1 className="daily-title">Create Daily Learning Plan</h1>
//         <p className="daily-subtitle">
//           Plan what you’ll study today and how long you’ll focus.
//         </p>

//         <form className="daily-form" onSubmit={handleSubmit} noValidate>
//           {/* Goal (optional) */}
//           <div className="form-group">
//             <label className="form-label">Linked Goal (Optional)</label>
//             <select
//               name="goal_id"
//               className="form-input"
//               value={plan.goal_id}
//               onChange={handleChange}
//             >
//               <option value="">No goal linked</option>
//               {goals.map((g) => (
//                 <option key={g.id} value={g.id}>
//                   {g.title}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Date */}
//           <div className="form-group">
//             <label className="form-label">Date</label>
//             <input
//               type="date"
//               name="date"
//               className={`form-input ${errors.date ? "has-error" : ""}`}
//               value={plan.date}
//               onChange={handleChange}
//             />
//             {errors.date && <p className="error-text">{errors.date}</p>}
//           </div>

//           {/* Topics */}
//           <div className="form-group">
//             <label className="form-label">Topics</label>
//             <textarea
//               name="topics"
//               placeholder="e.g., Lists, Tuples, Sets basics"
//               className={`form-textarea ${errors.topics ? "has-error" : ""}`}
//               value={plan.topics}
//               onChange={handleChange}
//             />
//             {errors.topics && <p className="error-text">{errors.topics}</p>}
//             <p className="helper-note">
//               You can enter comma-separated topics or a short description.
//             </p>
//           </div>

//           {/* Planned Hours */}
//           <div className="form-group">
//             <label className="form-label">Planned Hours</label>
//             <input
//               type="number"
//               name="planned_hours"
//               placeholder="e.g., 2"
//               className={`form-input ${
//                 errors.planned_hours ? "has-error" : ""
//               }`}
//               value={plan.planned_hours}
//               onChange={handleChange}
//             />
//             {errors.planned_hours && (
//               <p className="error-text">{errors.planned_hours}</p>
//             )}
//           </div>

//           {/* Completed checkbox */}
//           <div className="form-group checkbox-row">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 name="is_completed"
//                 checked={plan.is_completed}
//                 onChange={handleChange}
//               />
//               <span>Mark as completed</span>
//             </label>
//           </div>

//           {/* Submit */}
//           <button type="submit" className="daily-button">
//             Save Daily Plan
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// PRODUCTION

// // src/pages/DailyPlanForm.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./DailyPlan.css";

// /**
//  * Optional:
//  * You can pass `goals` as a prop = [{ id, title }, ...]
//  * For now, we'll keep a simple static example list.
//  */
// const sampleGoals = [
//   { id: 1, title: "Python Basics" },
//   { id: 2, title: "SQL Fundamentals" },
//   { id: 3, title: "React Beginner" },
// ];

// const API_BASE = "https://dailylearningplan.onrender.com/api";

// export default function DailyPlan({ goals = sampleGoals }) {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     date: "",
//     goal_id: "",
//     topics: "",
//     study_hours: "",
//     is_completed: false,
//   });

//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!form.date) newErrors.date = "Date is required";
//     if (!form.goal_id) newErrors.goal_id = "Please select a goal";
//     if (!form.topics) newErrors.topics = "Topics are required";

//     if (!form.study_hours) {
//       newErrors.study_hours = "Study hours is required";
//     } else if (isNaN(Number(form.study_hours))) {
//       newErrors.study_hours = "Study hours must be a number";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setServerError("");

//     if (!validate()) return;

//     try {
//       setLoading(true);

//       const payload = {
//         date: form.date, // ensure backend expects "YYYY-MM-DD"
//         // adjust field names depending on your serializer:
//         goal: Number(form.goal_id),
//         topics: form.topics,
//         study_hours: Number(form.study_hours),
//         is_completed: form.is_completed,
//       };

//       const res = await fetch(`${API_BASE}/daily-plans/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           // If using token auth:
//           // Authorization: `Token ${localStorage.getItem("authToken")}`
//         },
//         body: JSON.stringify(payload),
//         credentials: "include",
//       });

//       if (!res.ok) {
//         const data = await res.json().catch(() => ({}));
//         setServerError(
//           data.detail || data.error || "Failed to save daily plan."
//         );
//         return;
//       }

//       // const data = await res.json();
//       // Optionally use `data`

//       navigate("/dashboard");
//     } catch (err) {
//       console.error("Daily plan create error:", err);
//       setServerError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="daily-root">
//       <div className="daily-card">
//         <div className="daily-header">
//           <h1 className="daily-title">Create Daily Plan</h1>
//           <p className="daily-subtitle">
//             Plan what you will study today based on your goals.
//           </p>
//         </div>

//         {serverError && (
//           <p className="error-text server-error">{serverError}</p>
//         )}

//         <form className="daily-form" onSubmit={handleSubmit} noValidate>
//           {/* Date */}
//           <div className="form-group">
//             <label htmlFor="date" className="form-label">
//               Date
//             </label>
//             <div className="input-wrapper">
//               <input
//                 id="date"
//                 name="date"
//                 type="date"
//                 className={`form-input ${errors.date ? "has-error" : ""}`}
//                 value={form.date}
//                 onChange={handleChange}
//               />
//             </div>
//             {errors.date && <p className="error-text">{errors.date}</p>}
//           </div>

//           {/* Goal Select */}
//           <div className="form-group">
//             <label htmlFor="goal_id" className="form-label">
//               Goal
//             </label>
//             <div className="input-wrapper">
//               <select
//                 id="goal_id"
//                 name="goal_id"
//                 className={`form-input ${errors.goal_id ? "has-error" : ""}`}
//                 value={form.goal_id}
//                 onChange={handleChange}
//               >
//                 <option value="">Select a goal</option>
//                 {goals.map((goal) => (
//                   <option key={goal.id} value={goal.id}>
//                     {goal.title}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {errors.goal_id && <p className="error-text">{errors.goal_id}</p>}
//           </div>

//           {/* Topics */}
//           <div className="form-group">
//             <label htmlFor="topics" className="form-label">
//               Topics / Tasks for Today
//             </label>
//             <div className="input-wrapper">
//               <textarea
//                 id="topics"
//                 name="topics"
//                 className={`form-textarea ${
//                   errors.topics ? "has-error" : ""
//                 }`}
//                 placeholder="List the topics or tasks you will study..."
//                 value={form.topics}
//                 onChange={handleChange}
//               />
//             </div>
//             {errors.topics && <p className="error-text">{errors.topics}</p>}
//           </div>

//           {/* Study Hours */}
//           <div className="form-group">
//             <label htmlFor="study_hours" className="form-label">
//               Planned Study Hours
//             </label>
//             <div className="input-wrapper">
//               <input
//                 id="study_hours"
//                 name="study_hours"
//                 type="number"
//                 min="0.5"
//                 step="0.5"
//                 className={`form-input ${
//                   errors.study_hours ? "has-error" : ""
//                 }`}
//                 placeholder="e.g. 2"
//                 value={form.study_hours}
//                 onChange={handleChange}
//               />
//             </div>
//             {errors.study_hours && (
//               <p className="error-text">{errors.study_hours}</p>
//             )}
//           </div>

//           {/* Completed Checkbox */}
//           <div className="form-group checkbox-group">
//             <label className="checkbox-label">
//               <input
//                 type="checkbox"
//                 name="is_completed"
//                 checked={form.is_completed}
//                 onChange={handleChange}
//               />
//               <span>Mark as completed</span>
//             </label>
//           </div>

//           {/* Submit */}
//           <button type="submit" className="daily-button" disabled={loading}>
//             {loading ? "Saving..." : "Save Daily Plan"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// WITH COOKIE


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DailyPlan.css";

/**
 * Fallback sample goals (used only if API fails)
 */
const sampleGoals = [
  { id: 1, title: "Python Basics" },
  { id: 2, title: "SQL Fundamentals" },
  { id: 3, title: "React Beginner" },
];

const API_BASE = "https://dailylearningplan.onrender.com/api";

export default function DailyPlan() {
  const navigate = useNavigate();

  const [goals, setGoals] = useState(sampleGoals);
  const [form, setForm] = useState({
    date: "",
    goal_id: "",
    topics: "",
    study_hours: "",
    is_completed: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // ---------------------------
  // Load goals from API (no redirect here)
  // ---------------------------
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`${API_BASE}/goals/`, {
          credentials: "include", // send auth_token cookie
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.warn("Failed to fetch goals, using sample goals fallback.");
          return;
        }

        const data = await res.json().catch(() => []);
        if (Array.isArray(data) && data.length > 0) {
          setGoals(data);
        }
      } catch (err) {
        console.error("Error fetching goals:", err);
        // keep fallback sampleGoals
      }
    };

    fetchGoals();
  }, []);

  // ---------------------------
  // Handlers
  // ---------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Date is required";
    if (!form.goal_id) newErrors.goal_id = "Please select a goal";
    if (!form.topics) newErrors.topics = "Topics are required";

    if (!form.study_hours) {
      newErrors.study_hours = "Study hours is required";
    } else if (isNaN(Number(form.study_hours))) {
      newErrors.study_hours = "Study hours must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    try {
      setLoading(true);

      const payload = {
        date: form.date, // "YYYY-MM-DD"
        goal: Number(form.goal_id), // FK id
        topics: form.topics,
        study_hours: Number(form.study_hours),
        is_completed: form.is_completed,
      };

      const res = await fetch(`${API_BASE}/daily-plans/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include", // IMPORTANT: send cookie
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(
          data.detail || data.error || "Failed to save daily plan."
        );
        return;
      }

      // Success → go back to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Daily plan create error:", err);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------
  // JSX – same UI structure
  // ---------------------------
  return (
    <div className="daily-root">
      <div className="daily-card">
        <div className="daily-header">
          <h1 className="daily-title">Create Daily Plan</h1>
          <p className="daily-subtitle">
            Plan what you will study today based on your goals.
          </p>
        </div>

        {serverError && (
          <p className="error-text server-error">{serverError}</p>
        )}

        <form className="daily-form" onSubmit={handleSubmit} noValidate>
          {/* Date */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <div className="input-wrapper">
              <input
                id="date"
                name="date"
                type="date"
                className={`form-input ${errors.date ? "has-error" : ""}`}
                value={form.date}
                onChange={handleChange}
              />
            </div>
            {errors.date && <p className="error-text">{errors.date}</p>}
          </div>

          {/* Goal Select */}
          <div className="form-group">
            <label htmlFor="goal_id" className="form-label">
              Goal
            </label>
            <div className="input-wrapper">
              <select
                id="goal_id"
                name="goal_id"
                className={`form-input ${errors.goal_id ? "has-error" : ""}`}
                value={form.goal_id}
                onChange={handleChange}
              >
                <option value="">Select a goal</option>
                {goals.map((goal) => (
                  <option key={goal.id} value={goal.id}>
                    {goal.title}
                  </option>
                ))}
              </select>
            </div>
            {errors.goal_id && <p className="error-text">{errors.goal_id}</p>}
          </div>

          {/* Topics */}
          <div className="form-group">
            <label htmlFor="topics" className="form-label">
              Topics / Tasks for Today
            </label>
            <div className="input-wrapper">
              <textarea
                id="topics"
                name="topics"
                className={`form-textarea ${
                  errors.topics ? "has-error" : ""
                }`}
                placeholder="List the topics or tasks you will study..."
                value={form.topics}
                onChange={handleChange}
              />
            </div>
            {errors.topics && <p className="error-text">{errors.topics}</p>}
          </div>

          {/* Study Hours */}
          <div className="form-group">
            <label htmlFor="study_hours" className="form-label">
              Planned Study Hours
            </label>
            <div className="input-wrapper">
              <input
                id="study_hours"
                name="study_hours"
                type="number"
                min="0.5"
                step="0.5"
                className={`form-input ${
                  errors.study_hours ? "has-error" : ""
                }`}
                placeholder="e.g. 2"
                value={form.study_hours}
                onChange={handleChange}
              />
            </div>
            {errors.study_hours && (
              <p className="error-text">{errors.study_hours}</p>
            )}
          </div>

          {/* Completed Checkbox */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="is_completed"
                checked={form.is_completed}
                onChange={handleChange}
              />
              <span>Mark as completed</span>
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="daily-button" disabled={loading}>
            {loading ? "Saving..." : "Save Daily Plan"}
          </button>
        </form>
      </div>
    </div>
  );
}

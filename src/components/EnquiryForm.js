import React, { useState } from "react";
import emailjs from "emailjs-com";

// Constants
const destinations = [
  { label: "Local Run", value: "Local Run" },
  { label: "Outstation Run", value: "Outstation Run" },
];

const busTypes = ["AC Deluxe Buses", "AC Luxury Buses", "AC Sleeper Buses"];

const localPackages = [
  "4hr/40km",
  "8hr/80km",
  "12hr/120km",
  "16hr/160km",
  "24hr/200km",
];

const outstationPackages = ["One Way", "Roundtrip"];

const busOptions = {
  "AC Deluxe Buses": [
    "AC Deluxe Bus 21 Seater (2+1)",
    "AC Deluxe Bus 27 Seater (2+2)",
    "AC Deluxe Bus 35 Seater (2+2)",
    "AC Deluxe Bus 41 Seater (2+2)",
    "AC Deluxe Bus 45 Seater (2+2)",
    "AC Deluxe Bus 49 Seater (2+2)",
    "AC Deluxe Bus 60 Seater (3+2)",
  ],
  "AC Luxury Buses": [
    "AC Luxury Bus 25 Seater (2+1)",
    "AC Luxury Bus 31 Seater (2+2)",
    "AC Luxury Bus 41 Seater (2+2)",
    "AC Luxury Bus 45 Seater (2+2)",
    "AC Luxury Bus 49 Seater (2+2)",
    "AC Luxury Bus 55 Seater (2+2)",
  ],
  "AC Sleeper Buses": ["AC Seater Sleeper Bus (2+2)", "AC Sleeper Bus (2+1)"],
};

// Main Form Component
export default function EnquiryForm({ setShowEnquiry }) {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const [form, setForm] = useState({
    Destination: "",
    packageLocal: "",
    packageOutstation: "",
    Vehicle_Type: "",
    Bus: "",
    Travel_Date: "",
    Pickup_Location: [""],
    Drop_Location: [""],
    Drop_Time: "",
    Name: "",
    Email: "",
    Phone: "",
    message: "",
  });

  const handleChange = (e, idx = null, isPickup = true) => {
    const { name, value } = e.target;
    if (name === "Pickup_Location[]") {
      const updated = [...form.Pickup_Location];
      updated[idx] = value;
      setForm({ ...form, Pickup_Location: updated });
    } else if (name === "Drop_Location[]") {
      const updated = [...form.Drop_Location];
      updated[idx] = value;
      setForm({ ...form, Drop_Location: updated });
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addLocation = (isPickup) => {
    const key = isPickup ? "Pickup_Location" : "Drop_Location";
    setForm((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  };

  const removeLocation = (idx, isPickup) => {
    const key = isPickup ? "Pickup_Location" : "Drop_Location";
    const updated = form[key].filter((_, i) => i !== idx);
    setForm((prev) => ({ ...prev, [key]: updated.length ? updated : [""] }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return (
          form.Destination &&
          ((form.Destination === "Local Run" && form.packageLocal) ||
            (form.Destination === "Outstation Run" &&
              form.packageOutstation)) &&
          form.Vehicle_Type &&
          form.Bus
        );
      case 2:
        return (
          form.Travel_Date &&
          form.Pickup_Location.every((loc) => loc.trim()) &&
          form.Drop_Location.every((loc) => loc.trim()) &&
          form.Drop_Time
        );
      case 3:
        return (
          form.Name &&
          form.Email &&
          /\S+@\S+\.\S+/.test(form.Email) &&
          form.Phone &&
          /^[0-9]{10}$/.test(form.Phone)
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    } else {
      alert("Please fill all required fields before continuing.");
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const finalData = {
      name: form.Name,
      email: form.Email,
      phone: form.Phone,
      message: form.message,
      destination: form.Destination,
      package:
        form.Destination === "Local Run"
          ? form.packageLocal
          : form.packageOutstation,
      vehicle_type: form.Vehicle_Type,
      bus: form.Bus,
      travel_date: form.Travel_Date,
      pickup_locations: form.Pickup_Location.join(", "),
      drop_locations: form.Drop_Location.join(", "),
      drop_time: form.Drop_Time,
    };

    emailjs
      .send(
        "service_4oeg3tm", // replace with your actual service ID
        "template_uyy4jjf", // replace with your actual template ID
        finalData,

        "7IcpWlwEc64OhqF-H" // replace with your public key
      )
      .then(() => {
        alert("Enquiry submitted! We'll contact you soon.");
        setStep(1);
        setForm({
          Destination: "",
          packageLocal: "",
          packageOutstation: "",
          Vehicle_Type: "",
          Bus: "",
          Travel_Date: "",
          Pickup_Location: [""],
          Drop_Location: [""],
          Drop_Time: "",
          Name: "",
          Email: "",
          Phone: "",
          message: "",
        });
        if (setShowEnquiry) setShowEnquiry(false);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        alert("Failed to send enquiry. Please try again.");
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl w-full mx-auto bg-white p-6 rounded-2xl shadow-xl text-sm border border-gray-100"
    >
      <h2 className="text-lg font-semibold text-center mb-4 text-blue-700">
        🚌 Bus Hire Enquiry Form
      </h2>

      <div
        className="h-2 bg-gradient-to-r from-orange-400 to-blue-500 rounded-full mb-6"
        style={{ width: `${(step / totalSteps) * 100}%` }}
      ></div>

      {/* Step 1 */}
      {step === 1 && (
        <div className="space-y-4">
          <Select
            label="Destination"
            name="Destination"
            value={form.Destination}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                Destination: e.target.value,
                packageLocal: "",
                packageOutstation: "",
              }))
            }
            options={destinations}
          />
          {form.Destination === "Local Run" && (
            <Select
              label="Package"
              name="packageLocal"
              value={form.packageLocal}
              onChange={handleChange}
              options={localPackages.map((p) => ({ label: p, value: p }))}
            />
          )}
          {form.Destination === "Outstation Run" && (
            <Select
              label="Package"
              name="packageOutstation"
              value={form.packageOutstation}
              onChange={handleChange}
              options={outstationPackages.map((p) => ({ label: p, value: p }))}
            />
          )}
          <Select
            label="Bus Type"
            name="Vehicle_Type"
            value={form.Vehicle_Type}
            onChange={(e) =>
              setForm((f) => ({ ...f, Vehicle_Type: e.target.value, Bus: "" }))
            }
            options={busTypes.map((b) => ({ label: b, value: b }))}
          />
          <Select
            label="Bus"
            name="Bus"
            value={form.Bus}
            onChange={handleChange}
            options={(busOptions[form.Vehicle_Type] || []).map((b) => ({
              label: b,
              value: b,
            }))}
          />
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <Input
            label="Travel Date & Time"
            type="datetime-local"
            name="Travel_Date"
            value={form.Travel_Date}
            onChange={handleChange}
            min={new Date().toISOString().slice(0, 16)}
          />
          <MultiInput
            label="Pickup Location(s)"
            name="Pickup_Location[]"
            values={form.Pickup_Location}
            onChange={handleChange}
            add={() => addLocation(true)}
            remove={(i) => removeLocation(i, true)}
          />
          <MultiInput
            label="Drop Location(s)"
            name="Drop_Location[]"
            values={form.Drop_Location}
            onChange={handleChange}
            add={() => addLocation(false)}
            remove={(i) => removeLocation(i, false)}
          />
          <Input
            label="Drop-off Date & Time"
            type="datetime-local"
            name="Drop_Time"
            value={form.Drop_Time}
            onChange={handleChange}
            min={form.Travel_Date || new Date().toISOString().slice(0, 16)}
          />
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <Input
            label="Name"
            name="Name"
            value={form.Name}
            onChange={handleChange}
          />
          <Input
            label="Email"
            name="Email"
            type="email"
            value={form.Email}
            onChange={handleChange}
            required
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Please enter a valid email address"
          />
          <Input
            label="Phone"
            name="Phone"
            type="tel"
            value={form.Phone}
            onChange={handleChange}
          />
          <div>
            <label className="block font-medium text-blue-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
              className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
            />
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        {step > 1 ? (
          <button
            type="button"
            onClick={handlePrev}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600"
          >
            Previous
          </button>
        ) : (
          <div />
        )}
        {step < totalSteps ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!validateStep()}
            className={`px-4 py-2 font-semibold rounded shadow ${
              validateStep()
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white font-semibold rounded shadow hover:bg-green-700"
          >
            Submit Enquiry
          </button>
        )}
      </div>
    </form>
  );
}

// Reusable Components
function Select({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block font-medium text-blue-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
        required
      >
        <option value="" disabled>
          Select {label}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Input({ label, type = "text", name, value, onChange, min }) {
  return (
    <div>
      <label className="block font-medium text-blue-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        className="w-full border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
        required
      />
    </div>
  );
}

function MultiInput({ label, name, values, onChange, add, remove }) {
  return (
    <div>
      <label className="block font-medium text-blue-700 mb-1">{label}</label>
      {values.map((val, idx) => (
        <div key={idx} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            name={name}
            value={val}
            onChange={(e) => onChange(e, idx)}
            className="flex-1 border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-orange-300"
            required
          />
          {values.length > 1 && (
            <button
              type="button"
              onClick={() => remove(idx)}
              className="bg-red-100 text-red-600 rounded px-2 font-bold"
            >
              −
            </button>
          )}
          <button
            type="button"
            onClick={add}
            className="bg-green-100 text-green-600 rounded px-2 font-bold"
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

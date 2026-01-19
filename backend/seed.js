const mongoose = require("mongoose");
const Internship = require("./Model/Internship");
const Job = require("./Model/Job");
require("dotenv").config();

const internships = [
    {
        title: "Full Stack Developer Intern",
        company: "Tech Solutions Inc.",
        location: "Remote",
        category: "Engineering",
        aboutCompany: "A leading tech company providing innovative solutions.",
        aboutInternship: "Work on real-world projects using MERN stack.",
        whoCanApply: "Students with knowledge of React and Node.js.",
        perks: ["Certificate", "Letter of Recommendation", "Flexible Hours"],
        numberOfOpening: "5",
        stipend: "10000/month",
        startDate: "Immediately",
        additionalInfo: "Pre-placement offer available for good performers.",
    },
    {
        title: "Digital Marketing Intern",
        company: "Growth Hackers",
        location: "Bangalore",
        category: "Media",
        aboutCompany: "We help brands grow exponentially.",
        aboutInternship: "Manage social media accounts and run campaigns.",
        whoCanApply: "Marketing enthusiasts with good communication skills.",
        perks: ["Certificate", "5 days a week"],
        numberOfOpening: "2",
        stipend: "8000/month",
        startDate: "Next Month",
        additionalInfo: "Learning opportunity with experts.",
    },
    {
        title: "Graphic Design Intern",
        company: "Creative Studio",
        location: "Mumbai",
        category: "Design",
        aboutCompany: "A creative agency for modern brands.",
        aboutInternship: "Design social media posts and marketing materials.",
        whoCanApply: "Proficient in Photoshop and Illustrator.",
        perks: ["Certificate", "Flexible Hours"],
        numberOfOpening: "3",
        stipend: "5000/month",
        startDate: "Immediately",
        additionalInfo: "Portfolio required.",
    },
];

const jobs = [
    {
        title: "Junior Software Engineer",
        company: "InnovateX",
        location: "Hyderabad",
        Experience: "0-1 years",
        category: "Engineering",
        aboutCompany: "Product based company working on AI.",
        aboutJob: "Develop and maintain REST APIs.",
        whoCanApply: "B.Tech graduates with strong coding skills.",
        perks: ["Health Insurance", "Stock Options"],
        AdditionalInfo: "Remote work options available.",
        CTC: "6 LPA",
        StartDate: "Immediately",
    },
    {
        title: "Data Analyst",
        company: "DataCorp",
        location: "Pune",
        Experience: "1-2 years",
        category: "Data Science",
        aboutCompany: "Big data analytics firm.",
        aboutJob: "Analyze trends and generate reports.",
        whoCanApply: "Statistics or CS background.",
        perks: ["Performance Bonus"],
        AdditionalInfo: "Work from office.",
        CTC: "8 LPA",
        StartDate: "Next Month",
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to DB");

        await Internship.deleteMany({});
        await Job.deleteMany({});
        console.log("Cleared existing data");

        await Internship.insertMany(internships);
        await Job.insertMany(jobs);
        console.log("Seeded database with sample data");

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

seedDB();

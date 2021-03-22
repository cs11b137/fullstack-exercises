import React from 'react';
import './App.css';

interface CoursePartBase {
    name: string,
    exerciseCount: number,
    type: string
}

interface CourseNSBothPart extends CoursePartBase {
    description: string
}

interface CourseNormalPart extends CourseNSBothPart {
    type: 'normal'
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseNSBothPart {
    type: "submission";
    exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
}

const Header = ({ courseName }: { courseName: string }): JSX.Element => {
    return <h1>{courseName}</h1>;
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    );
};

const Part = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
    return (
        <div>
            {courseParts.map(course => {
                switch (course.type) {
                    case 'normal':
                        return <p>{course.type} {course.name} {course.exerciseCount} {course.description}</p>

                    case 'groupProject':
                        return <p>{course.type} {course.name} {course.exerciseCount} {course.groupProjectCount}</p>

                    case 'submission':
                        return <p>{course.type} {course.name} {course.exerciseSubmissionLink} {course.exerciseCount} {course.description}</p>

                    default:
                        return assertNever(course)
                }
            })}
        </div>
    );
}

const App: React.FC = () => {
    const courseName = "Half Stack application development";
    const courseParts: CoursePart[] = [
        {
            name: "Fundamentals",
            exerciseCount: 10,
            description: "This is the leisured course part",
            type: "normal"
        },
        {
            name: "Advanced",
            exerciseCount: 7,
            description: "This is the harded course part",
            type: "normal"
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7,
            groupProjectCount: 3,
            type: "groupProject"
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14,
            description: "Confusing description",
            exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
            type: "submission"
        }
    ]

    return (
        <div>
            <Header courseName={courseName} />
            <Part courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

export default App;

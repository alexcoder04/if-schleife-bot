/**
 * A map of all supported languages with their name and a regex for 
 * different written and spoken versions of their name. 
 */
export const rolesMap = [
    {
        name: "C++",
        regex: /^C(\+\+|PP)/i,
    },
    {
        name: "C#",
        regex: /^C(#|S)/i,
    },
    {
        name: "Golang",
        regex: /^Go(lang)?/i,
    },
    {
        name: "Java+Kotlin",
        regex: /^Java|^Kotlin|^Java.?Kotlin/i,
    },
    {
        name: "Python",
        regex: /^Py(thon)?/i,
    },
    {
        name: "HTML / CSS / JavaScript",
        regex: /^HTML|^CSS|^JS|^Javascript|^Web(dev)?/i,
    },
    {
        name: "LeoConsole",
        regex: /^LeoConsole|^LC/i,
    },
    {
        name: "Shell",
        regex: /^(POSIX)?[\s-]?Shell|^Bash/i,
    },
    {
        name: "Software Help",
        regex: /^Git(Hub)?|^Editor|^IDE|^Software([\s-]Help)?/i,
    },
    {
        name: "Bot",
        regex: /^(Discord)?[\s-]?Bot/i,
    },
    {
        name: "Machine Learning",
        regex: /^Machine[\s-]?Learning/i,
    },
    {
        name: "Mobile (Android / iOS)",
        regex: /^Mobile|^iOS|^Android|^LineageOS|^Apps?/i,
    },
    {
        name: "Algorithms / Theory",
        regex: /^Algorithms?|^Theory|^Binary tree/i,
    }
];

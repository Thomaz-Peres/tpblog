import fs from 'fs'
import path from 'path'
import readingTime from 'reading-time'
import matter from 'gray-matter'


export const POSTS_PATH = path.join(process.cwd(), 'posts');

export function getPost(fileName: string) {
    var postFilePath = path.join(POSTS_PATH, `${fileName}.mdx`);
    var fileContents = fs.readFileSync(postFilePath, 'utf8');

    var { data: data, content: source } = matter(fileContents);
    var { minutes } = readingTime(source);

    var date = new Date(data.date).toISOString().substring(0, 10);
    var slug = fileName.split('.mdx')[0];

    return {
        description: data.description,
        title: data.title,
        date: date,
        source: source,
        minutesRead: minutes,
        slug: slug
    }
}

export function getPaths() {
    var postNames = fs.readdirSync(POSTS_PATH);
    var postToGeneratePath = postNames.filter((postName) => {
        var postDir = path.join(process.cwd(), 'posts', postName);
        return fs.existsSync(postDir);
    });

    return postToGeneratePath.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));
}
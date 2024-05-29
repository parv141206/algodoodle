This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

To create a new branch and add changes to it in Git via the command line interface (CLI), follow these steps:

## Creating a New Branch

1. Open your terminal or command prompt.

2. Navigate to your Git repository directory using the `cd` command.

3. Run the following command to create a new branch:

```bash
git checkout -b <new_branch_name>
```

Replace `<new_branch_name>` with the name you want to give your new branch.

This command will create a new branch and automatically switch to it.

## Adding Changes to the Branch

1. Make the necessary changes to your project files.

2. After making the changes, add the modified files to the staging area using the following command:

```bash
git add <file1> <file2> ...
```

Replace `<file1>`, `<file2>`, etc., with the names of the files you want to add.

3. Commit the staged changes with a descriptive commit message:

```bash
git commit -m "Your commit message"
```

Replace `"Your commit message"` with a brief description of the changes you made.

4. Repeat steps 1-3 as you continue working on your branch and making changes.

## Merging the Branch

Once you're satisfied with the changes made in your branch and you want to merge them into the main branch (e.g., `main` or `master`), follow these steps:

1. Switch to the main branch using the following command:

```bash
git checkout main
```

Replace `main` with the name of your main branch if it's different.

2. Merge the changes from your branch into the main branch using the `git merge` command:

```bash
git merge <branch_name>
```

Replace `<branch_name>` with the name of your branch.

3. If there are any conflicts, Git will prompt you to resolve them. Open the conflicting files, choose the desired changes, and save the files.

4. After resolving any conflicts, add the resolved files to the staging area using `git add .`.

5. Commit the merge using the following command:

```bash
git commit -m "Merge branch <branch_name> into main"
```

Replace `<branch_name>` with the name of your branch and `main` with the name of your main branch if it's different.

6. Finally, push the merged changes to the remote repository using:

```bash
git push
```

By following these steps, you can create a new branch, add changes to it, and merge it into the main branch once the branch is stable and ready to be merged.

Citations:
[1] https://www.geeksforgeeks.org/git-merge/
[2] https://www.atlassian.com/git/tutorials/using-branches/git-merge
[3] https://phoenixnap.com/kb/git-merge-branch-into-master
[4] https://stackoverflow.com/questions/61704871/best-way-to-merge-into-a-stable-branch-via-a-local-git
[5] https://www.toolsqa.com/git/merge-branch-in-git/

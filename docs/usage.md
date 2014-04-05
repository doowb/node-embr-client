Now that node-emdr-client is installed globally, run `node-emdr-client` to use the CLI.

If you want to take it for a test run, copy/paste this into the command line:

```bash
node-emdr-client todo.md "Create my own CLI!"
```

To add another task, just follow the same format: `node-emdr-client [file] [task]`

Or, use these command line arguments:

* `-f`| `--file` specify the file you want to create or append. If no source file is explicitly passed, then `TODO.md` will be created/appended.
* `-t`| `--task` the task you'd like to add to the specified file

Example: `node-emdr-client -t "Write more documentation"`
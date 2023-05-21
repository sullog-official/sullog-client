const setPlopGenerator = (
  /** @type {import('plop').NodePlopAPI} */
  plop
) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is your component name?',
      },
      {
        type: 'input',
        name: 'path',
        message: 'What is your component path?',
        default: 'src/shared/components',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}/index.ts',
        templateFile: 'plop-templates/Component/index.ts.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: 'plop-templates/Component/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}/{{pascalCase name}}.module.scss',
        templateFile: 'plop-templates/Component/Component.module.scss.hbs',
      },
      {
        type: 'add',
        path: '{{path}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'plop-templates/Component/Component.stories.tsx.hbs',
      },
    ],
  });
};

export default setPlopGenerator;

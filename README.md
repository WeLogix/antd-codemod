# antd-codemod

This repository contains some codemod transformers via [JSCodeshift](https://github.com/facebook/jscodeshift)
that help upgrade the ant-design getFieldProps API change in the application code

## Setup

  * `npm install -g jscodeshift`
  * `git clone`
  * Run `npm install` in the cloned directory
  * `ag -l 'getFieldProps' YOUR-code-repo | xargs jscodeshift -t antd-getFieldProps-to-getFieldDecrorator.js`
  * Use the `-d` option for a dry-run and use `-p` to print the output for comparison

## Status
  
  * still experimental, transformed code may cause lint error.
  * `antd-getFieldProps-to-getFieldDecrorator.js` only support `getFieldProps` written as the JSX attribute.
    Codes like the following format can't be transformed:
      ```js
        const { labelName, rules, fieldProps, formhoc: { getFieldProps } } = this.props;
        const fieldProps = getFieldProps(field, { rules, ...fieldProps }); 
        return (
          <FormItem label={labelName} labelCol={{ span: colSpan }} wrapperCol={{ span: 24 - colSpan }}
          >
            <Input {...fieldProps} />
          </FormItem>
        );
      ```

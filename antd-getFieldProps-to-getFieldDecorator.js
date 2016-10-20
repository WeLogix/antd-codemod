/* Convert
  <Select showSearch optionFilterProp="searched"
    {...getFieldProps('trsPartnerId', {
      rules: [{ required: true, message: 'Trucking provider must be selected', type: 'number' }],
    })} allowClear
  >
    {
      transps.map(pt => (
        <Option searched={`${pt.partner_code}${pt.name}`}
          value={pt.partner_id} key={pt.partner_id}
        >
          {pt.name}
        </Option>
      ))
    }
  </Select>

  to

  {getFieldDecorator('trsPartnerId', {
    rules: [{ required: true, message: 'Trucking provider must be selected', type: 'number' }],
  })(
  <Select showSearch optionFilterProp="searched" allowClear>
    {
      transps.map(pt => (
        <Option searched={`${pt.partner_code}${pt.name}`}
          value={pt.partner_id} key={pt.partner_id}
        >
          {pt.name}
        </Option>
      ))
    }
  </Select>)}
*/
module.exports = function(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  // console.log(j);
  const getFieldPropsId = root.find(j.Identifier, { name: 'getFieldProps' });
  getFieldPropsId.replaceWith(j.identifier('getFieldDecorator'));
  const getFieldPropsCalls = [];
  root.find(j.CallExpression, {
    callee: {
      type: 'Identifier',
      name: 'getFieldDecorator',
    }
  }).forEach(path => {
    getFieldPropsCalls.push(path);
  });
  root.find(j.CallExpression, {
    callee: {
      property: {
        type: 'Identifier',
        name: 'getFieldDecorator',
      }
    }
  }).forEach(path => {
    getFieldPropsCalls.push(path);
  });
  console.log(getFieldPropsCalls.length);
  getFieldPropsCalls.forEach(fpcPath => {
    if (fpcPath.parent.value.type === 'JSXSpreadAttribute') {
      const getFieldPropsCall = j(fpcPath);
      const fieldPropsSpread = getFieldPropsCall.closest(j.JSXSpreadAttribute);
      const fieldPropsElem = getFieldPropsCall.closest(j.JSXElement);
      console.log(getFieldPropsCall.nodes()[0]);
      console.log(fieldPropsSpread.nodes()[0]);
      console.log(fieldPropsElem.nodes()[0]);

      fieldPropsSpread.remove();
      const fieldblock =
          j.jsxExpressionContainer(
            j.callExpression(getFieldPropsCall.nodes()[0], [fieldPropsElem.nodes()[0]])
          );
      fieldPropsElem.replaceWith(fieldblock);
    }
  });
  return root.toSource();
}

// module.exports.parser = 'babel';

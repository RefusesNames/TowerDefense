module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"extends": [
		"airbnb-base",
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
	],
	"globals": {
		"Atomics": "readonly",
		"SharedArrayBuffer": "readonly"
	},
	"parserOptions": {
		"ecmaVersion": 2018,
		"parser": "@typescript-eslint/parser",
		"sourceType": "module"
	},
	"plugins": [
		"@typescript-eslint"
	],
	"ignorePatterns": [
		"node_modules/",
		"dist/"
	],
	"rules": {
		"no-tabs": "off",
		"indent" : [ "error", "tab" ]
	}
};

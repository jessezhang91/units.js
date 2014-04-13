/* description: Parses end executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s*\n\s*				// Ignore
[0-9]+("."[0-9]+)?\b	return 'NUMBER'
\s*"*"\s*				return '*'
\s*"/"\s*				return '/'
\s*"-"\s*				return '-'
\s*"+"\s*				return '+'
\s*"^"\s*				return '^'
"("\s*					return '('
\s*")"					return ')'
"["\s*					return '['
\s*"]"					return ']'
"{"\s*					return '{'
\s*"}"					return '}'
[A-Za-z]+				return 'UNIT'
"in"					return 'in'
\s+						return 'SEP'
<<EOF>>					return 'EOF'
.						return 'INVALID'

/lex

/* operator associations and precedence */

%left UNITGROUP
%left '+' '-'
%left '*' '/'
%left UMINUS
%left '^'
%left 'in'

%start expression

%% /* language grammar */

expression
	: ng 'in' u EOF
		{
			$1.unit = u;
			return $1;
		}
	| ng EOF
		{
			return $1;
		}
	| u EOF
		{
			return $1;
		}
	;

ng
	: ng '+' ng
		{
			$$ = units._add($1, $3);
		}
	| ng '-' ng
		{
			$$ = units._subtract($1, $3);
		}
	| ng '*' ng
		{
			$$ = units._times($1, $3);
		}
	| ng '/' ng
		{
			$$ = units._divide($1, $3);
		}
	| ng '^' n
		{
			$$ = units._power($1, $3);
		}
	| '-' ng %prec UMINUS
		{
			$$ = {
				value: -$2.value,
				unit: $2.unit
			};
		}
	| '(' ng ')'
		{
			$$ = $2;
		}
	| '[' ng ']'
		{
			$$ = $2;
		}
	| '{' ng '}'
		{
			$$ = $2;
		}
	| NUMBER SEP u %prec UNITGROUP
		{
			$$ = units._convert({
				value: Number($1),
				unit: $3
			});
		}
	| NUMBER
		{
			$$ = {
				value: Number($1),
				unit: []
			};
		}
	;

u
	: u '/' u
		{
			$$ = units._udivide($1, $3);
		}
	| u '-' u
		{
			$$ = units._utimes($1, $3);
		}
	| u '*' u
		{
			$$ = units._utimes($1, $3);
		}
	| u '^' NUMBER %prec UNITPOWER
		{
			$$ = units._upower($1, Number($3));
		}
	| u '^' '-' NUMBER %prec UNITPOWER
		{
			$$ = units._upower($1, -Number($4));
		}
	| '(' u ')'
		{
			$$ = $2;
		}
	| UNIT
		{
			$$ = units._parseUnit($1);
		}
	;
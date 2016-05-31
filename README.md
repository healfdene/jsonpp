# jsonpp
JSON pretty print that minimizes line count while preserving readablity

Written in node.js, v6

Takes JSON from stdin and writes to stdout. E.g.

node jsonpp < ugly.json > pretty.json

There is an optional argument for max width, which is
the approximate max width of a line. E.g.

node jsonpp 140 < ugly.json > pretty.json

I wrote this because my AWS CloudFormation templates were getting very long
to scroll through. This tightened them up a bit and seemed like a good
compromise.

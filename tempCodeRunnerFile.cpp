#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

// Function to calculate the greatest common divisor (GCD)
int gcd(int a, int b) {
  while (b) {
    tie(a, b) = make_tuple(b, a % b);
  }
  return a;
}

// Function to merge two segments in the segment tree
pair<int, int> merge(pair<int, int> t1, pair<int, int> t2) {
    if (t1.first == 0) return t2;
    if (t2.first == 0) return t1;
    if (t1.first == t2.first) return {t1.first, t1.second + t2.second};
    if (t1.first % t2.first == 0) return t2;
    if (t2.first % t1.first == 0) return t1;
    return {gcd(t1.first, t2.first), 1};
}

// Function to build the segment tree
void build(vector<pair<int, int>>& tree, const vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n; i++) {
    tree[i + n] = {arr[i], 1};
  }
  for (int i = n - 1; i > 0; i--) {
    tree[i] = merge(tree[i * 2], tree[i * 2 + 1]);
  }
}

// Function to create a segment tree
vector<pair<int, int>> makeSegmentTree(const vector<int>& arr) {
  int n = arr.size();
  vector<pair<int, int>> tree(2 * n);
  build(tree, arr);
  return tree;
}

// Function to perform range query for GCD
pair<int, int> rangeGCD(const vector<pair<int, int>>& tree, int al, int ar) {
  int n = tree.size() / 2;
  al += n;
  ar += n;
  pair<int, int> res = {0, 0};
  while (al < ar) {
    if (al & 1) res = merge(res, tree[al++]);
    if (ar & 1) res = merge(res, tree[--ar]);
    al >>= 1;
    ar >>= 1;
  }
  return res;
}

int main() {
  int n;
  cin >> n;

  vector<int> s(n);
  for (int i = 0; i < n; i++) {
    cin >> s[i];
  }

  int t;
  cin >> t;

  vector<pair<int,int>> tree = makeSegmentTree(s);

  for (int i = 0; i < t; i++) {
    int l, r;
    cin >> l >> r;
    cout << (r - l + 1 - rangeGCD(tree, l - 1, r).second) << endl;
  }

  return 0;
}
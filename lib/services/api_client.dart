import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiClient {
  final String baseUrl;
  ApiClient({required this.baseUrl});

  Future<Map<String, dynamic>> login() async {
    final response = await http.get(Uri.parse('$baseUrl/api/login'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception('Failed to authenticate');
  }

  Future<Map<String, dynamic>> submitChallenge() async {
    final response = await http.get(Uri.parse('$baseUrl/api/challenge/submit'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception('Failed to submit challenge');
  }

  Future<Map<String, dynamic>> fetchLeaderboard() async {
    final response = await http.get(Uri.parse('$baseUrl/api/leaderboard'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw Exception('Failed to fetch leaderboard');
  }
}

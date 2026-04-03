# N8N Integration Guide

This dashboard is designed to integrate with N8N workflows. Follow this guide to set up your N8N instance.

## Prerequisites

- N8N instance running (local or cloud)
- N8N version 1.0+
- Basic familiarity with N8N workflows

## Setup Instructions

### 1. Create N8N Workflows

You need to create the following webhooks in your N8N instance:

#### Webhook 1: Get Reviews (`/webhook/reviews`)

This webhook fetches the latest reviews from Play Store or your data source.

**Configuration:**
- **Method**: GET
- **Path**: `/webhook/reviews`
- **Response Format**: JSON

**Expected Response:**
```json
{
  "reviews": [
    {
      "id": "123",
      "text": "Great app!",
      "rating": 5,
      "sentiment": "positive",
      "score": 0.95,
      "reason": "excellent",
      "userName": "John Doe",
      "date": "Apr 1, 2026"
    }
  ],
  "summary": {
    "total_reviews": 100,
    "positive_count": 60,
    "neutral_count": 25,
    "negative_count": 15,
    "top_complaints": ["Bug 1", "Bug 2"],
    "top_features": ["Feature 1", "Feature 2"],
    "daily_summary": "Summary text"
  }
}
```

#### Webhook 2: Export Report (`/webhook/export`)

This webhook handles exporting reports to email.

**Configuration:**
- **Method**: POST
- **Path**: `/webhook/export`
- **Accept Body**: JSON

**Request Format:**
```json
{
  "email": "user@example.com",
  "format": "pdf",
  "includeCharts": true
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Report exported successfully"
}
```

### 2. Set Environment Variables

Update your environment variables in `.env.local` or configure them in Vercel:

```bash
# Local Development
VITE_API_BASE_URL=http://localhost:5678
VITE_N8N_REVIEWS_WEBHOOK=/webhook/reviews
VITE_N8N_EXPORT_WEBHOOK=/webhook/export
```

For production on Vercel:
1. Go to Vercel Project Settings → Environment Variables
2. Add the following:
   - `VITE_API_BASE_URL`: Your N8N production URL
   - `VITE_N8N_REVIEWS_WEBHOOK`: The reviews webhook path
   - `VITE_N8N_EXPORT_WEBHOOK`: The export webhook path

### 3. N8N Workflow Examples

#### Example 1: Reviews Webhook (Google Play Store)

1. Create a new workflow in N8N
2. Add a **Webhook** trigger node:
   - Set method to GET
   - Set path to `/reviews`
3. Add nodes to:
   - Fetch reviews from Google Play Store API or your database
   - Extract sentiment using AI or ML nodes
   - Format response according to the expected schema
   - Return the formatted response

#### Example 2: Export Report Webhook

1. Create a new workflow in N8N
2. Add a **Webhook** trigger node:
   - Set method to POST
   - Set path to `/export`
3. Add nodes to:
   - Parse the incoming request (email, format, includeCharts)
   - Generate report in the requested format (PDF/CSV/JSON)
   - Send email using Gmail, SendGrid, or similar
   - Return success response

### 4. Testing the Integration

1. Start N8N: `n8n start` (or use N8N Cloud)
2. In your terminal, test the webhook:

```bash
# Test GET /webhook/reviews
curl http://localhost:5678/webhook/reviews

# Test POST /webhook/export
curl -X POST http://localhost:5678/webhook/export \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "format": "pdf",
    "includeCharts": true
  }'
```

3. Update `.env.local` with your N8N URL
4. Run `npm run dev` and verify data loads

## Error Handling

The dashboard has built-in error handling:
- If N8N is unavailable, it falls back to mock data
- Errors are logged in the browser console
- User-friendly error messages are displayed

## Security Considerations

- Use HTTPS in production
- Consider adding authentication to N8N webhooks
- Use environment variables for sensitive data
- Never commit `.env.local` or `.env.production` to git

## Troubleshooting

**Issue**: Dashboard shows "Error Loading Data"
- **Solution**: Check if N8N is running and webhooks are accessible
- Verify `VITE_API_BASE_URL` is correct
- Check browser console for CORS errors

**Issue**: Webhooks returning 404
- **Solution**: Verify webhook paths exactly match in N8N and .env files
- Check N8N webhook is active and not disabled

**Issue**: Fallback mock data showing instead of real data
- **Solution**: 
  - Verify N8N webhook is accessible from your machine/Vercel
  - Check response format matches expected schema
  - Review N8N workflow logs for errors

## Additional Resources

- [N8N Documentation](https://docs.n8n.io/)
- [N8N Webhooks Guide](https://docs.n8n.io/nodes/n8n-nodes-base.webhook/)
- [N8N Community](https://community.n8n.io/)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review N8N workflow logs
3. Check browser console for errors
4. Verify network connectivity

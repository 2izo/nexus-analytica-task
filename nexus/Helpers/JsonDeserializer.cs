using System.Text.Json;

namespace nexus.Helpers
{
    public class JsonDeserializer
    {
        public static T LoadData<T>(string filePath)
        {
            try
            {
                string json = File.ReadAllText(filePath);
                return JsonSerializer.Deserialize<T>(json);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading data: {ex.Message}");
                return default;
            }
        }
    }
}

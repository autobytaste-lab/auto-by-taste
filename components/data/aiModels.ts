import type { AIModel } from './types';

export const aiModels: readonly AIModel[] = [
  // Small models (3-4B) - 8GB RAM Macs
  {
    id: 'phi-3-mini',
    name: 'Phi-3 Mini',
    family: 'Phi',
    parameters: '3.8B',
    minRamGB: 8,
    quantization: 'Q4_K_M',
    description: 'Mô hình nhỏ gọn, phù hợp cho trò chuyện cơ bản',
    useCase: 'Chatbot đơn giản, trả lời câu hỏi thông thường'
  },
  {
    id: 'gemma-2b',
    name: 'Gemma 2B',
    family: 'Gemma',
    parameters: '2B',
    minRamGB: 8,
    quantization: 'Q4_K_M',
    description: 'Siêu nhẹ, tốc độ nhanh nhất',
    useCase: 'Tóm tắt văn bản ngắn, kiểm tra chính tả'
  },

  // Mid-range models (7-8B) - 16GB RAM Macs
  {
    id: 'llama-3-1-8b',
    name: 'Llama 3.1 8B',
    family: 'Llama',
    parameters: '8B',
    minRamGB: 16,
    quantization: 'Q4_K_M',
    description: 'Tiêu chuẩn vàng cho trợ lý cá nhân',
    useCase: 'Viết email, code assistant, dịch thuật, tư vấn'
  },
  {
    id: 'mistral-7b',
    name: 'Mistral 7B',
    family: 'Mistral',
    parameters: '7B',
    minRamGB: 16,
    quantization: 'Q4_K_M',
    description: 'Hiệu suất mạnh mẽ, đa nhiệm tốt',
    useCase: 'Phân tích dữ liệu, tạo nội dung marketing'
  },
  {
    id: 'qwen-2-5-7b',
    name: 'Qwen 2.5 7B',
    family: 'Qwen',
    parameters: '7B',
    minRamGB: 16,
    quantization: 'Q4_K_M',
    description: 'Mạnh về toán học và code',
    useCase: 'Lập trình, giải toán, phân tích kỹ thuật'
  },

  // Larger models (13-14B) - 24GB RAM Macs
  {
    id: 'phi-4',
    name: 'Phi-4',
    family: 'Phi',
    parameters: '14B',
    minRamGB: 24,
    quantization: 'Q4_K_M',
    description: 'Cân bằng giữa kích thước và chất lượng',
    useCase: 'Nghiên cứu, phân tích chuyên sâu, viết báo cáo'
  },
  {
    id: 'mistral-nemo-12b',
    name: 'Mistral Nemo 12B',
    family: 'Mistral',
    parameters: '12B',
    minRamGB: 24,
    quantization: 'Q4_K_M',
    description: 'Phù hợp văn phòng vừa và nhỏ',
    useCase: 'Quản lý tri thức doanh nghiệp, RAG cơ bản'
  },

  // Large models (30-34B) - 32GB RAM Macs
  {
    id: 'qwen-2-5-32b',
    name: 'Qwen 2.5 32B',
    family: 'Qwen',
    parameters: '32B',
    minRamGB: 32,
    quantization: 'Q4_K_M',
    description: 'Chuyên gia về code và phân tích',
    useCase: 'Code generation nâng cao, kiến trúc phần mềm'
  },

  // Very large models (70B) - 64GB RAM Macs
  {
    id: 'llama-3-1-70b',
    name: 'Llama 3.1 70B',
    family: 'Llama',
    parameters: '70B',
    minRamGB: 64,
    quantization: 'Q4_K_M',
    description: 'Mô hình mạnh mẽ cho doanh nghiệp',
    useCase: 'RAG phức tạp, phân tích dữ liệu lớn, tư vấn chuyên sâu'
  },
  {
    id: 'qwen-2-5-72b',
    name: 'Qwen 2.5 72B',
    family: 'Qwen',
    parameters: '72B',
    minRamGB: 64,
    quantization: 'Q4_K_M',
    description: 'Sức mạnh đỉnh cao cho code và toán',
    useCase: 'Kiến trúc hệ thống, nghiên cứu AI'
  },

  // Extreme models (140B+) - 128GB+ RAM Macs
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3',
    family: 'DeepSeek',
    parameters: '671B (MoE)',
    minRamGB: 128,
    quantization: 'Q4_K_M',
    description: 'Chuyên gia về code và lý luận',
    useCase: 'Phát triển AI, nghiên cứu khoa học'
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    family: 'DeepSeek',
    parameters: '671B (MoE)',
    minRamGB: 128,
    quantization: 'Q4_K_M',
    description: 'Reasoning model mạnh nhất',
    useCase: 'Giải quyết vấn đề phức tạp, lập kế hoạch chiến lược'
  }
] as const;

export const getAIModelById = (id: string): AIModel | undefined => {
  return aiModels.find(model => model.id === id);
};

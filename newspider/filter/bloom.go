package filter

import (
	"encoding/json"
	"log"

	"github.com/bits-and-blooms/bloom/v3"
)

func DecodeBloomFilter(filterData []byte) *bloom.BloomFilter {
	var filter *bloom.BloomFilter
	if len(filterData) < 32 {
		filter = CreateNewFilter()
	} else {
		err := json.Unmarshal(filterData, &filter)
		if err != nil {
			log.Fatalln(err)
		}
	}

	return filter
}

func CreateNewFilter() *bloom.BloomFilter {
	k := uint(1000000)
	fp := float64(0.001)
	filter := bloom.NewWithEstimates(k, fp)
	return filter
}

func MarshalBloomFilter(f *bloom.BloomFilter) []byte {
	data, err := json.Marshal(f)
	if err != nil {
		log.Fatalln(err)
	}
	return data
}

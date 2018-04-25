#!/bin/bash -l
#-----------------------------------
# job.slurm
#
# Submit: 
#   sbatch job.slurm
#
# Check status:
#   squeue | grep [userid]
#   squeue -u [userid]
#   squeue -j [jobid]
#-----------------------------------

#SBATCH -J myarc
#SBATCH --partition=defq
#SBATCH --workdir=./
#SBATCH --export=ALL
#SBATCH --exclusive

# Sets the maximum time the job can run (hh:mm:ss).
#SBATCH --time=0:01:00

# Specifies nodes for the job. 
#SBATCH -N 1               # Number of nodes
#SBATCH -n 1               # Number of MPI tasks

# Sets the output files.
#SBATCH --output=./myarc.%j.txt
###SBATCH --error=./stderr.%j.txt

# Job events (mail-type): begin, end, fail, all. 
###SBATCH --mail-type=fail
###SBATCH --mail-user=[userid]@und.edu

#echo "Modules loaded"
module list
echo ""

./myarc.exe --input_filename 60x60x1.txt --run_time 2

